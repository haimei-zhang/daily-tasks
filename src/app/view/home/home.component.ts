import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MENUS } from '~constants';
import { User } from '~models/user.model';
import { AuthService } from '~service/auth.service';

@Component({
  selector: 'diary-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnInit {

  avatarSrc = 'assets/images/habits.jpeg';
  cols = 3;
  user: User;
  MENUS = MENUS;

  constructor(public authService: AuthService) {
  }

  ngOnInit(): void {
    this.getUser();
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

  private getUser(): void {
    this.user = this.authService.getLoggedInUser();
  }

}
