import { Component, OnInit } from '@angular/core';
import { CreateUpdateHabitsDialogComponent } from '~components/dialog/create-update-habits-dialog/create-update-habits-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import {
  CHALLENGING_TASKS,
  GAME_TASKS, LOVE_TASKS,
  MEDITATION_TASKS,
  SELF_CARE_TASKS,
  SPORTS_TASKS,
  STUDY_TASKS
} from '~constants';

@Component({
  selector: 'diary-habits-content',
  templateUrl: './habits-content.component.html',
  styleUrls: ['./habits-content.component.scss']
})
export class HabitsContentComponent implements OnInit {

  selfCareTasks = SELF_CARE_TASKS;
  sportsTasks = SPORTS_TASKS;
  studyTasks = STUDY_TASKS;
  meditationTasks = MEDITATION_TASKS;
  gameTasks = GAME_TASKS;
  challengingTasks = CHALLENGING_TASKS;
  loveTasks = LOVE_TASKS;

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  createTask(taskName: string): void {
    const config = {
      data: {
        title: 'DIALOG.CREATE_HABIT',
        name: '',
        completedDate: new Date(),
        notes: ''
      }
    };
    this.openCreateHabitDialog(config);
  }

  private openCreateHabitDialog(config): void {
    const dialogRef = this.dialog.open(CreateUpdateHabitsDialogComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}
