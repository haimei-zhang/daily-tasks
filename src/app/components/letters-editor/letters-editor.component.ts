import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { dateToTime } from '~utils/core.util';
import { Letter } from '~models/letter.model';

import { StoreService } from '~service/store/store.service';
import { AuthService } from '~service/auth.service';
import { DiaryStoreService } from '~service/store/diary-store.service';

@Component({
  selector: 'diary-letters-editor',
  templateUrl: './letters-editor.component.html',
  styleUrls: ['./letters-editor.component.scss']
})
export class LettersEditorComponent implements OnInit, OnDestroy {

  currentLetter: Letter;
  currentLetterSubscription: Subscription;
  friends$ = this.diaryStoreService.friends$;

  title: string;
  content: string;
  authorId: string;
  isVisibleToUserIds: string[];

  constructor(readonly storeService: StoreService,
              readonly authService: AuthService,
              readonly diaryStoreService: DiaryStoreService) { }

  ngOnInit(): void {
    this.getCurrentLetter();
  }

  ngOnDestroy(): void {
    this.currentLetterSubscription.unsubscribe();
  }

  save(): void {
    if (this.title && this.content) {
      if (this.currentLetter?.id) {
        this.updateLetter();
      } else {
        this.createLetter();
      }
    }
  }

  cancel(): void {
    this.storeService.updateEditMode(false);
    this.diaryStoreService.clearCurrentLetter();
  }

  private updateLetter(): void {
    const letter = {
      title: this.title,
      content: this.content,
      isVisibleToUserIds: this.isVisibleToUserIds,
      editedDate: dateToTime(new Date())
    } as Letter;
    this.diaryStoreService.updateLetter(this.currentLetter.id, letter);
  }

  private createLetter(): void {
    const letter = {
      title: this.title,
      content: this.content,
      isVisibleToUserIds: this.isVisibleToUserIds,
      authorId: this.authService.getLoggedInUser().uid,
      authorName: this.authService.getLoggedInUser().displayName,
      createdDate: dateToTime(new Date())
    } as Letter;
    this.diaryStoreService.createLetter(letter);
    this.storeService.updateEditMode(false);
  }

  private getCurrentLetter(): void {
    this.currentLetterSubscription = this.diaryStoreService.currentLetter$.subscribe(letter => {
      this.currentLetter = letter;
      if (this.currentLetter) {
        this.title = this.currentLetter.title;
        this.content = this.currentLetter.content;
        this.authorId = this.currentLetter.authorId;
        this.isVisibleToUserIds = this.currentLetter.isVisibleToUserIds;
      } else {
        this.title = '';
        this.content = '';
        this.authorId = '';
        this.isVisibleToUserIds = [];
      }
    });
  }
}
