import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from '~components/dialog/confirmation-dialog/confirmation-dialog.component';
import { CreateUpdateHabitsComponent } from '~components/dialog/create-update-habits/create-update-habits.component';

import { StoreService } from '~service/store/store.service';

@Component({
  selector: 'diary-movies-table',
  templateUrl: './movies-table.component.html',
  styleUrls: ['./movies-table.component.scss']
})
export class MoviesTableComponent implements OnInit {

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

  displayedColumns: string[] = ['name', 'notes', 'complete', 'date', 'action'];
  dataToDisplay = [...this.ELEMENT_DATA];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(public dialog: MatDialog,
              readonly storeService: StoreService) {
  }

  ngOnInit(): void {
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

  openDeleteConfirmationDialog(element): void {
    const config = {
      data: {
        title: 'DIALOG.DELETE_HABIT',
        content: 'DIALOG.DELETE_HABIT_MESSAGE'
      }
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, config);
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.removeData(element);
      }
    });
  }

  openEditHabitDialog(element): void {
    const config = {
      data: element
    };
    const dialogRef = this.dialog.open(CreateUpdateHabitsComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      this.edit(result);
    });
  }

}
