import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StoreService } from '~service/store/store.service';

@Component({
  selector: 'diary-letters-table',
  templateUrl: './letters-table.component.html',
  styleUrls: ['./letters-table.component.scss']
})
export class LettersTableComponent implements OnInit {

  name: string;
  author: number;
  date: number;
  action: string;

  ELEMENT_DATA = [
    {author: 1, name: 'Hydrogen', date: 1.0079, action: 'H'},
    {author: 2, name: 'Helium', date: 4.0026, action: 'He'},
    {author: 3, name: 'Lithium', date: 6.941, action: 'Li'},
    {author: 4, name: 'Beryllium', date: 9.0122, action: 'Be'},
    {author: 5, name: 'Boron', date: 10.811, action: 'B'},
    {author: 6, name: 'Carbon', date: 12.0107, action: 'C'},
    {author: 7, name: 'Nitrogen', date: 14.0067, action: 'N'},
    {author: 8, name: 'Oxygen', date: 15.9994, action: 'O'},
    {author: 9, name: 'Fluorine', date: 18.9984, action: 'F'},
    {author: 10, name: 'Neon', date: 20.1797, action: 'Ne'},
  ];

  displayedColumns: string[] = ['name', 'author', 'date', 'action'];
  dataToDisplay = [...this.ELEMENT_DATA];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(readonly storeService: StoreService) { }

  ngOnInit(): void {
  }

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
}
