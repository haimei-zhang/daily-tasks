import { Component, OnInit } from '@angular/core';
import { StoreService } from '~service/store/store.service';

@Component({
  selector: 'diary-agreements',
  templateUrl: './agreements.component.html',
  styleUrls: ['./agreements.component.scss']
})
export class AgreementsComponent implements OnInit {

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
