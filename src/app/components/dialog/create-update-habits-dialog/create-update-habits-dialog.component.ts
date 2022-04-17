import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { Habit } from '~models/habit.model';
import { Friend } from '~models/friend.model';
import { User } from '~models/user.model';

import { DiaryStoreService } from '~service/store/diary-store.service';
import { AuthService } from '~service/auth.service';

@Component({
  selector: 'diary-create-update-habits',
  templateUrl: './create-update-habits-dialog.component.html',
  styleUrls: ['./create-update-habits-dialog.component.scss']
})
export class CreateUpdateHabitsDialogComponent implements OnInit {

  friends$: Observable<Friend[]>;
  user: User;

  constructor(public dialogRef: MatDialogRef<CreateUpdateHabitsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Habit,
              readonly authService: AuthService,
              readonly diaryStoreService: DiaryStoreService) {
  }

  ngOnInit() {
    this.friends$ = this.diaryStoreService.friends$;
    this.user = this.authService.getLoggedInUser();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
