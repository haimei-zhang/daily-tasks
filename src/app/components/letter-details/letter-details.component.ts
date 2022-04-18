import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Letter } from '~models/letter.model';

import { DiaryStoreService } from '~service/store/diary-store.service';
import { StoreService } from '~service/store/store.service';
import { ConfirmationDialogComponent } from '~components/dialog/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'diary-letter-details',
  templateUrl: './letter-details.component.html',
  styleUrls: ['./letter-details.component.scss']
})
export class LetterDetailsComponent implements OnInit, OnDestroy {

  avatarSrc = 'assets/images/letters.jpeg';
  currentLetter: Letter;
  isEditMode = false;

  currentLetterSubscription: Subscription;
  isEditModeSubscription: Subscription;

  constructor(public router: Router,
              public dialog: MatDialog,
              readonly storeService: StoreService,
              readonly diaryStoreService: DiaryStoreService) { }

  ngOnInit(): void {
    this.getCurrentLetter();
    this.getEditMode();
  }

  ngOnDestroy(): void {
    this.currentLetterSubscription.unsubscribe();
    this.isEditModeSubscription.unsubscribe();
  }

  refresh(event): void {
    console.log(event)
  }

  edit(): void {
    this.storeService.updateEditMode(true);
  }

  openDeleteConfirmationDialog(): void {
    const config = {
      data: {
        title: 'DIALOG.DELETE_LETTER',
        content: 'DIALOG.DELETE_LETTER_MESSAGE'
      }
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, config);
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.removeData();
      }
    });
  }

  private removeData() {
    this.diaryStoreService.deleteLetter(this.currentLetter.id);
    this.storeService.updateEditMode(false);
    this.router.navigate(['letters']);
  }


  private getCurrentLetter(): void {
    this.currentLetterSubscription = this.diaryStoreService.currentLetter$.subscribe(letter => {
      this.currentLetter = letter;
    });
  }

  private getEditMode(): void {
    this.isEditModeSubscription = this.storeService.isEditMode$.subscribe((isEditMode) => {
      this.isEditMode = isEditMode;
    });
  }

}
