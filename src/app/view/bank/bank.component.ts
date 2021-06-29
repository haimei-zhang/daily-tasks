import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'diary-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {

  avatarSrc = 'https://thispersondoesnotexist.com/image';

  constructor() { }

  ngOnInit(): void {
  }

  refresh(event): void {
    console.log(event)
  }


}
