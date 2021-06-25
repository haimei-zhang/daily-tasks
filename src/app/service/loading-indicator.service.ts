import { EventEmitter, Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService {

  onLoadingChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  requestStartedStatus: EventEmitter<any> = new EventEmitter<any>();
  creations = 0;
  resolutions = 0;
  requestStarted = {};

  constructor() { }

  onStarted(req: HttpRequest<any>): void {
    if (!this.ignoreRequests(req)) {
      this.creations++;
    }
    this.notify();
  }

  onFinished(req: HttpRequest<any>): void {
    if (!this.ignoreRequests(req)) {
      this.resolutions++;
    }
    this.notify();
  }

  private notify(): void {
    this.onLoadingChanged.emit(this.creations > this.resolutions);
    this.requestStartedStatus.emit(this.requestStarted);
  }

  private ignoreRequests(req: HttpRequest<any>): boolean {
    // return req.url.indexOf('') > -1;
    return false;
  }
}
