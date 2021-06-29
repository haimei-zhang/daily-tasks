import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { ELEMENT_DATA } from '~constants';

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

  ELEMENT_DATA = ELEMENT_DATA;

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
    if (checked) {
      const config = {
        data: {
          title: 'DIALOG.COMPLETE_HABIT',
          date: ''
        }
      };
      const dialogRef = this.dialog.open(CreateUpdateHabitsComponent, config);
      dialogRef.afterClosed().subscribe(result => {
        this.edit(result);
      });
    }
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
    element.title = 'DIALOG.EDIT_HABIT';
    const config = {
      data: element
    };
    const dialogRef = this.dialog.open(CreateUpdateHabitsComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      this.edit(result);
    });
  }

}
