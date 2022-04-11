import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'diary-habits',
  templateUrl: './habits.component.html',
  styleUrls: ['./habits.component.scss']
})
export class HabitsComponent implements OnInit {

  avatarSrc = 'assets/images/habits.jpeg';

  constructor() { }

  ngOnInit(): void {
  }

  refresh(lastRefreshTime): void {
    console.log(lastRefreshTime);
  }

}
