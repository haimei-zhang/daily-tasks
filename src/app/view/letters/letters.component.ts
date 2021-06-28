import { Component, OnInit } from '@angular/core';
import { StoreService } from '~service/store/store.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

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
export class LettersComponent implements OnInit {

  avatarSrc = 'https://thispersondoesnotexist.com/image';
  isEditMode: boolean;

  constructor(readonly storeService: StoreService) { }

  ngOnInit(): void {
    this.getEditMode();
  }

  refresh(lastRefreshTime): void {
    console.log(lastRefreshTime);
  }

  private getEditMode(): void {
    this.storeService.isEditMode$.subscribe((isEditMode) => {
      this.isEditMode = isEditMode;
    });
  }

}
