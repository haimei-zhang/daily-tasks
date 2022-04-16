import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUpdateHabitsDialogComponent } from '~components/dialog/create-update-habits-dialog/create-update-habits-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { Habit } from '~models/habit.model';
import { DB_COLLECTION_NAME } from '~constants';
import { dateToTime } from '~utils/core.util';

import { DiaryStoreService } from '~service/store/diary-store.service';
import { AuthService } from '~service/auth.service';

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
  movieTasks$: Observable<Habit[]>;

  DB_COLLECTION_NAME = DB_COLLECTION_NAME;

  constructor(public dialog: MatDialog,
              readonly authService: AuthService,
              readonly diaryStoreService: DiaryStoreService) {
  }

  ngOnInit(): void {
    this.getTasks();
  }

  createTask(taskName: string): void {
    const config = {
      data: {
        title: 'DIALOG.CREATE_HABIT',
        name: '',
        notes: '',
        createdDate: dateToTime(new Date()),
        completedDate: null,
        isCompletedToday: false,
        authorId: this.authService.getLoggedInUser().uid,
        authorName: this.authService.getLoggedInUser().displayName,
        isVisibleToUserIds: []
      }
    };
    this.openCreateHabitDialog(config, taskName);
  }

  private openCreateHabitDialog(config: any, taskName: string): void {
    const dialogRef = this.dialog.open(CreateUpdateHabitsDialogComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.diaryStoreService.createHabit(taskName, result);
      }
    });
  }

  private getTasks(): void {
    this.selfCareTasks$ = this.diaryStoreService.selfCareTasks$;
    this.sportsTasks$ = this.diaryStoreService.sportsTasks$;
    this.studyTasks$ = this.diaryStoreService.studyTasks$;
    this.meditationTasks$ = this.diaryStoreService.meditationTasks$;
    this.gameTasks$ = this.diaryStoreService.gameTasks$;
    this.challengingTasks$ = this.diaryStoreService.challengingTasks$;
    this.loveTasks$ = this.diaryStoreService.loveTasks$;
    this.movieTasks$ = this.diaryStoreService.movieTasks$;
  }

}
