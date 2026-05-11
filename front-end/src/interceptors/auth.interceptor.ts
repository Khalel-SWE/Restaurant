import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // نجيب اليوزر كامل من السيشن
    const userString = sessionStorage.getItem('user');

    if (userString) {

      const user = JSON.parse(userString);

      // نجيب التوكن من جوه اليوزر
      const token = user.token;

      if (token) {

        request = request.clone({

          setHeaders: {
            Authorization: `Bearer ${token}`
          }

        });

      }

    }

    return next.handle(request);
  }
}