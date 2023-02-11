import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;

  collapsed: boolean = true;
  isSaving: boolean = false;
  isFetching: boolean = false;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(
      (userData) => {
        console.log('UserData: ', userData);
        this.isAuthenticated = userData ? true : false;
      }
    );
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onStorageRecipes() {
    this.isSaving = true;

    this.dataStorageService
      .storeRecipes()
      .subscribe((responseData) => {
        console.log(responseData);
        this.isSaving = false;
      });
  }

  onFetchRecipes() {
    this.isFetching = true;
    this.dataStorageService.fetchRecipes().subscribe(() => {
      this.isFetching = false;
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
