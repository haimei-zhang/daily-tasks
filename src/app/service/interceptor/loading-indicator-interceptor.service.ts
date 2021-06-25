import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { LoadingIndicatorService } from '../loading-indicator.service';

@Injectable()
export class LoadingIndicatorInterceptorService {

  constructor(private loadingIndicatorService: LoadingIndicatorService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingIndicatorService.onStarted(req);

    return next.handle(req).pipe(
      finalize(() => this.loadingIndicatorService.onFinished(req))
    );
  }

}
