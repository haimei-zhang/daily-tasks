import { Component, OnInit } from '@angular/core';
import { MENUS } from '~constants';

@Component({
  selector: 'diary-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  MENUS = MENUS;

  constructor() { }

  ngOnInit(): void {
  }

}
