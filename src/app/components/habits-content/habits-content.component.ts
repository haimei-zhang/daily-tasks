import { Component, OnInit } from '@angular/core';
import { CreateUpdateHabitsComponent } from '~components/dialog/create-update-habits/create-update-habits.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'diary-habits-content',
  templateUrl: './habits-content.component.html',
  styleUrls: ['./habits-content.component.scss']
})
export class HabitsContentComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  createStory(): void {
    const config = {
      data: {
        title: 'DIALOG.CREATE_HABIT',
        name: '',
        author: '',
        date: new Date(),
        notes: ''
      }
    };
    this.openCreateHabitDialog(config);
  }

  createMovieGame(): void {
    const config = {
      data: {
        title: 'DIALOG.CREATE_HABIT',
        name: '',
        notes: ''
      }
    };
    this.openCreateHabitDialog(config);
  }

  private openCreateHabitDialog(config): void {
    const dialogRef = this.dialog.open(CreateUpdateHabitsComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}
