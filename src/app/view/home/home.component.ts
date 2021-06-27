import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MENUS } from '~constants';

@Component({
  selector: 'diary-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnInit {

  cols = 3;
  MENUS = MENUS;

  constructor() {
  }

  ngOnInit(): void {
    this.setColsByWidth(window.innerWidth);
  }

  ngAfterViewInit(): void {
    const diaryHome = document.querySelector('#diary-home') as any;
    if (diaryHome) {
      setTimeout(() => this.setColsByWidth(diaryHome.offsetWidth), 0);
    }
  }

  onResize(event: any): void {
    this.setColsByWidth(event.target.innerWidth);
  }

  private setColsByWidth(width): void {
    if (width <= 960) {
      this.cols = 1;
    } else if (width <= 1240) {
      this.cols = 2;
    } else {
      this.cols = 3;
    }
  }

}
