import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { dateToTime } from '~utils/core.util';

import { StoreService } from '~service/store/store.service';

@Component({
  selector: 'diary-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input() pageTitle: string;
  @Input() pageSubtitle: string;
  @Input() avatarSrc: string;
  @Input() toShowAction: boolean;
  @Output() refreshEvent = new EventEmitter<number>();

  constructor(readonly router: Router,
              readonly storeService: StoreService) {
  }

  ngOnInit(): void {
  }

  goBackToHome(): void {
    this.router.navigate(['home']);
    this.storeService.updateEditMode(false);
  }

  refresh(): void {
    this.refreshEvent.emit(dateToTime(new Date()));
  }

}
