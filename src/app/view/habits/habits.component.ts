import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'diary-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.scss']
})
export class HabitsComponent implements OnInit {

  avatarSrc = 'https://thispersondoesnotexist.com/image';

  constructor() { }

  ngOnInit(): void {
  }

  refresh(lastRefreshTime): void {
    console.log(lastRefreshTime);
  }

}
