import { Component, OnInit } from '@angular/core';
import { MENUS } from '~constants';

@Component({
  selector: 'diary-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  MENUS = MENUS;

  constructor() { }

  ngOnInit(): void {
  }

}
