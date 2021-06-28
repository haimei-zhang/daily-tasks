import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  accessToken: string;
  isEditMode: boolean;

  readonly accessTokenSource = new BehaviorSubject<string>(this.accessToken);
  accessToken$ = this.accessTokenSource.asObservable();

  readonly isEditModeSource = new BehaviorSubject<boolean>(this.isEditMode);
  isEditMode$ = this.isEditModeSource.asObservable();

  constructor() {
  }

  updateEditMode(isEditMode): void {
    this.isEditMode = isEditMode;
    this.isEditModeSource.next(this.isEditMode);
  }

}
