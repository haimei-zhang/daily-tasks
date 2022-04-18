import { Component, OnDestroy, OnInit } from '@angular/core';
import { StoreService } from '~service/store/store.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'diary-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.scss'],
  animations: [
    trigger('slideHorizontalInOut', [
      state('in', style({width: '*', height: '*', opacity: '1', transform: 'translateX(0)', overflow: 'visible'})),
      state('out', style({width: '0', height: 0, opacity: '0', transform: 'translateX(50%)', overflow: 'hidden'})),
      transition('in => out', [
        animate((0))
      ]),
      transition('out => in', [
        animate('0.4s ease-in-out')
      ])
    ])
  ]
})
export class LettersComponent implements OnInit, OnDestroy {

  avatarSrc = 'assets/images/letters.jpeg';
  isEditMode: boolean;
  isEditModeSubscription: Subscription;

  constructor(readonly storeService: StoreService) { }

  ngOnInit(): void {
    this.getEditMode();
  }

  ngOnDestroy(): void {
    this.isEditModeSubscription.unsubscribe();
  }

  refresh(lastRefreshTime): void {
    console.log(lastRefreshTime);
  }

  private getEditMode(): void {
    this.isEditModeSubscription = this.storeService.isEditMode$.subscribe((isEditMode) => {
      this.isEditMode = isEditMode;
    });
  }

}
