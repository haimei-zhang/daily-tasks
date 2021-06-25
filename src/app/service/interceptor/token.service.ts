import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SESSION } from '~constants';

@Injectable({
  providedIn: 'root'
})
export class TokenService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authRequest = request.clone();
    if (this.isTokenWhitelist(request.url)) {
      authRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + SESSION.accessToken)
      });
    }
    return next.handle(authRequest);
  }

  private isTokenWhitelist(url: string): boolean {
    return url.indexOf('/catalogue/') > -1 || url.indexOf('/sim-service') > -1;
  }
}
