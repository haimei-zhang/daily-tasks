import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ELEMENT_DATA } from '~constants';
import { ConfirmationDialogComponent } from '~components/dialog/confirmation-dialog/confirmation-dialog.component';
import { CreateUpdateTasksDialogComponent } from '~components/dialog/create-update-tasks-dialog/create-update-tasks-dialog.component';

@Component({
  selector: 'diary-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss']
})
export class TasksTableComponent implements OnInit {

  completeUser1: boolean;
  completeUser2: boolean;

  ELEMENT_DATA = ELEMENT_DATA;

  displayedColumns: string[] = ['name', 'author', 'assignee', 'notes', 'amount', 'complete', 'action'];
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

  completeTask(element, user, checked): void {
    console.log(user)
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
    const dialogRef = this.dialog.open(CreateUpdateTasksDialogComponent, config);
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
