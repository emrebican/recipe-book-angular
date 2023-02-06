import { Component } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  collapsed: boolean = true;
  isSaving: boolean = false;
  isFetching: boolean = false;

  constructor(private dataStorageService: DataStorageService) {}

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
}
