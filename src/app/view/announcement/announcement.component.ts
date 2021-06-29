import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { StoreService } from '~service/store/store.service';

@Component({
  selector: 'diary-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {

  avatarSrc = 'https://thispersondoesnotexist.com/image';

  constructor(readonly storeService: StoreService) { }

  ngOnInit(): void {
  }

  refresh(lastRefreshTime): void {
    console.log(lastRefreshTime);
  }

}
