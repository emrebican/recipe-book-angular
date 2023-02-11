import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ): Promise<boolean> | Observable<boolean | UrlTree> | boolean {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        /* return user ? true : false; */
        const isAuth = user ? true : false;

        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
      /* tap((isAuth) => {
        if (!isAuth) {
          this.router.navigate(['/auth']);
        }
      }) */
    );
  }
}
