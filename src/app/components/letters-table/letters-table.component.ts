import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { TASKS } from '~constants';

import { StoreService } from '~service/store/store.service';

@Component({
  selector: 'diary-letters-table',
  templateUrl: './letters-table.component.html',
  styleUrls: ['./letters-table.component.scss']
})
export class LettersTableComponent implements OnInit {

  ELEMENT_DATA = TASKS;

  displayedColumns: string[] = ['name', 'date', 'action'];
  dataToDisplay = [...this.ELEMENT_DATA];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(readonly storeService: StoreService) { }

  ngOnInit(): void {
  }

  add(): void {
    this.storeService.updateEditMode(true);
  }

  removeData(data) {
    console.log(data);
    this.dataToDisplay = this.dataToDisplay.slice(0, -1);
    // this.dataSource.setData(this.dataToDisplay);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(element): void {
    console.log(element);
    this.storeService.updateEditMode(true);
  }
}
