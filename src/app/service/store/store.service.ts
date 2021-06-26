import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  accessToken: string;

  readonly accessTokenSource = new BehaviorSubject<string>(this.accessToken);
  accessToken$ = this.accessTokenSource.asObservable();

  constructor() {
  }

}
