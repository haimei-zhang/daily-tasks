import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { dateToTime } from '~utils/core.util';

@Component({
  selector: 'diary-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input() pageTitle: string;
  @Input() pageSubtitle: string;
  @Input() avatarSrc: string;
  @Output() refreshEvent = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  refresh(): void {
    this.refreshEvent.emit(dateToTime(new Date()));
  }

}
