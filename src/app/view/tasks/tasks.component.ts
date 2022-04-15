import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUpdateTasksDialogComponent } from '~components/dialog/create-update-tasks-dialog/create-update-tasks-dialog.component';

@Component({
  selector: 'diary-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  avatarSrc = 'assets/images/daily-tasks.jpg';

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  refresh(lastRefreshTime): void {
    console.log(lastRefreshTime);
  }

  createTask(): void {
    const config = {
      data: {
        title: 'DIALOG.CREATE_TASK',
        name: '',
        notes: '',
        date: new Date()
      }
    };
    this.openCreateTaskDialog(config);
  }

  private openCreateTaskDialog(config): void {
    const dialogRef = this.dialog.open(CreateUpdateTasksDialogComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
      console.log('The dialog was closed');
    });
  }

}
