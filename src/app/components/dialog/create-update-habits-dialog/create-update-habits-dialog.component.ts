import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { Habit } from '~models/habit.model';
import { Friend } from '~models/friend.model';

import { DiaryStoreService } from '~service/store/diary-store.service';

@Component({
  selector: 'diary-create-update-habits',
  templateUrl: './create-update-habits-dialog.component.html',
  styleUrls: ['./create-update-habits-dialog.component.scss']
})
export class CreateUpdateHabitsDialogComponent implements OnInit {

  friends$: Observable<Friend[]>;

  constructor(public dialogRef: MatDialogRef<CreateUpdateHabitsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Habit,
              readonly diaryStoreService: DiaryStoreService) {
  }

  ngOnInit() {
    this.friends$ = this.diaryStoreService.friends$;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
