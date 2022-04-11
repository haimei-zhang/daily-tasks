import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from '~components/dialog/confirmation-dialog/confirmation-dialog.component';
import { CreateUpdateHabitsDialogComponent } from '~components/dialog/create-update-habits-dialog/create-update-habits-dialog.component';
import { Habit } from '../../model/habit.model';

@Component({
  selector: 'diary-habits-table',
  templateUrl: './habits-table.component.html',
  styleUrls: ['./habits-table.component.scss']
})
export class HabitsTableComponent implements OnInit, OnChanges {

  @Input() data: Habit[] = [];

  displayedColumns: string[] = ['name', 'notes', 'completedDate', 'action'];
  dataToDisplay = [...this.data];
  dataSource = new MatTableDataSource(this.data);

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  completeTask(element, checked): void {
    if (checked) {
      const config = {
        data: {
          title: 'DIALOG.COMPLETE_HABIT',
          date: ''
        }
      };
      const dialogRef = this.dialog.open(CreateUpdateHabitsDialogComponent, config);
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
    const dialogRef = this.dialog.open(CreateUpdateHabitsDialogComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      this.edit(result);
    });
  }

  private removeData(data) {
    console.log(data);
    this.dataToDisplay = this.dataToDisplay.slice(0, -1);
    // this.dataSource.setData(this.dataToDisplay);
  }

  private edit(element): void {
    console.log(element);
  }

}
