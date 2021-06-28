import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateHabitsComponent } from '~components/dialog/create-habits/create-habits.component';

import { StoreService } from '~service/store/store.service';

@Component({
  selector: 'diary-stories-table',
  templateUrl: './stories-table.component.html',
  styleUrls: ['./stories-table.component.scss']
})
export class StoriesTableComponent implements OnInit {

  name: string;
  author: number;
  date: number;
  notes: string;

  completed: boolean;

  ELEMENT_DATA = [
    {author: 1, name: 'Hydrogen', date: 1.0079, notes: '', action: 'H'},
    {author: 2, name: 'Helium', date: 4.0026, notes: '', action: 'He'},
    {author: 3, name: 'Lithium', date: 6.941, notes: '', action: 'Li'},
    {author: 4, name: 'Beryllium', date: 9.0122, notes: '', action: 'Be'},
    {author: 5, name: 'Boron', date: 10.811, notes: '', action: 'B'},
    {author: 6, name: 'Carbon', date: 12.0107, notes: '', action: 'C'},
    {author: 7, name: 'Nitrogen', date: 14.0067, notes: '', action: 'N'},
    {author: 8, name: 'Oxygen', date: 15.9994, notes: '', action: 'O'},
    {author: 9, name: 'Fluorine', date: 18.9984, notes: '', action: 'F'},
    {author: 10, name: 'Neon', date: 20.1797, notes: '', action: 'Ne'},
  ];

  displayedColumns: string[] = ['name', 'author', 'date', 'notes', 'complete', 'action'];
  dataToDisplay = [...this.ELEMENT_DATA];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(readonly storeService: StoreService) { }

  ngOnInit(): void { }

  add() {
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

  completeTask(element, checked): void {
    console.log(checked)
  }

}
