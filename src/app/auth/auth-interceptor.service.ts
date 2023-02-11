import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      // Attaching the Token
      take(1),
      exhaustMap((user) => {
        // If there is no user
        if (!user) {
          console.log('INTERCEPTOR WORKS');
          return next.handle(req);
        }

        // If we have a user
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        });

        console.log('INTERCEPTOR WORKS');
        return next.handle(modifiedReq);
      })
    );
  }
}
