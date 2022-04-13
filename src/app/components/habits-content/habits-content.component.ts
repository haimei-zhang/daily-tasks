import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUpdateHabitsDialogComponent } from '~components/dialog/create-update-habits-dialog/create-update-habits-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { Habit } from '~models/habit.model';
import { DiaryStoreServiceService } from '~service/store/diary-store-service.service';

@Component({
  selector: 'diary-habits-content',
  templateUrl: './habits-content.component.html',
  styleUrls: ['./habits-content.component.scss']
})
export class HabitsContentComponent implements OnInit {

  selfCareTasks$: Observable<Habit[]>;
  sportsTasks$: Observable<Habit[]>;
  studyTasks$: Observable<Habit[]>;
  meditationTasks$: Observable<Habit[]>;
  gameTasks$: Observable<Habit[]>;
  challengingTasks$: Observable<Habit[]>;
  loveTasks$: Observable<Habit[]>;

  constructor(public dialog: MatDialog, readonly diaryStoreServiceService: DiaryStoreServiceService) {
  }

  ngOnInit(): void {
    this.selfCareTasks$ = this.diaryStoreServiceService.selfCareTasks$;
    this.sportsTasks$ = this.diaryStoreServiceService.sportsTasks$;
    this.studyTasks$ = this.diaryStoreServiceService.studyTasks$;
    this.meditationTasks$ = this.diaryStoreServiceService.meditationTasks$;
    this.gameTasks$ = this.diaryStoreServiceService.gameTasks$;
    this.challengingTasks$ = this.diaryStoreServiceService.challengingTasks$;
    this.loveTasks$ = this.diaryStoreServiceService.loveTasks$;
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
