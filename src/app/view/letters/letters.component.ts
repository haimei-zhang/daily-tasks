import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'diary-letters',
  templateUrl: './letters.component.html',
  styleUrls: ['./letters.component.scss']
})
export class LettersComponent implements OnInit {

  avatarSrc = 'https://thispersondoesnotexist.com/image';

  constructor() { }

  ngOnInit(): void {
  }

  refresh(lastRefreshTime): void {
    console.log(lastRefreshTime)
  }

}
