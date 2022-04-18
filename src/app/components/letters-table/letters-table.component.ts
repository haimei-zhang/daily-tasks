import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { Letter } from '~models/letter.model';

import { StoreService } from '~service/store/store.service';
import { DiaryStoreService } from '~service/store/diary-store.service';

@Component({
  selector: 'diary-letters-table',
  templateUrl: './letters-table.component.html',
  styleUrls: ['./letters-table.component.scss']
})
export class LettersTableComponent implements OnInit, OnDestroy {

  letters: Letter[] = [];
  lettersSubscription: Subscription;

  displayedColumns: string[] = ['title', 'authorName', 'createdDate', 'action'];
  dataToDisplay = [...this.letters];
  dataSource = new MatTableDataSource(this.letters);

  constructor(readonly storeService: StoreService,
              readonly diaryStoreService: DiaryStoreService) { }

  ngOnInit(): void {
    this.getLetters();
  }

  ngOnDestroy(): void {
    this.lettersSubscription.unsubscribe();
    this.storeService.updateEditMode(false);
  }

  add(): void {
    this.storeService.updateEditMode(true);
    this.diaryStoreService.clearCurrentLetter();
  }

  removeData(data) {
    // this.storeService.deleteLetter(data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(element): void {
    this.storeService.updateEditMode(true);
    this.diaryStoreService.updateCurrentLetter(element);
  }

  private getLetters(): void {
    this.lettersSubscription = this.diaryStoreService.letters$.subscribe(letters => {
      this.letters = letters;
      this.dataSource = new MatTableDataSource(this.letters);
    });
  }
}
