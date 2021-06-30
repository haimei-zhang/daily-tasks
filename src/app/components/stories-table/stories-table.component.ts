import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { ELEMENT_DATA } from '~constants';

import { ConfirmationDialogComponent } from '~components/dialog/confirmation-dialog/confirmation-dialog.component';
import { CreateUpdateHabitsDialogComponent } from '~components/dialog/create-update-habits-dialog/create-update-habits-dialog.component';

@Component({
  selector: 'diary-stories-table',
  templateUrl: './stories-table.component.html',
  styleUrls: ['./stories-table.component.scss']
})
export class StoriesTableComponent implements OnInit {

  ELEMENT_DATA = ELEMENT_DATA;

  displayedColumns: string[] = ['name', 'author', 'date', 'notes', 'complete', 'action'];
  dataToDisplay = [...this.ELEMENT_DATA];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
    element.title = 'DIALOG.EDIT_HABIT';
    const config = {
      data: element
    };
    const dialogRef = this.dialog.open(CreateUpdateHabitsDialogComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      this.edit(result);
    });
  }

  private removeData(data) {
    console.log(data);
    // this.dataSource.setData(this.dataToDisplay);
  }

  private edit(element): void {
    console.log(element);
  }

}
