import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'diary-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  avatarSrc = 'assets/images/shop.png';

  constructor() { }

  ngOnInit(): void {
  }

  refresh(e): void {

  }

}
