import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from '~components/dialog/confirmation-dialog/confirmation-dialog.component';

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

  constructor(public router: Router,
              public dialog: MatDialog,
              readonly storeService: StoreService,
              readonly diaryStoreService: DiaryStoreService) {
  }

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

  openDeleteConfirmationDialog(letter: Letter, e: Event): void {
    e.stopPropagation();
    const config = {
      data: {
        title: 'DIALOG.DELETE_LETTER',
        content: 'DIALOG.DELETE_LETTER_MESSAGE'
      }
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, config);
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.removeData(letter);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(letter: Letter, e: Event): void {
    e.stopPropagation();
    this.storeService.updateEditMode(true);
    this.diaryStoreService.updateCurrentLetter(letter);
  }

  view(row: Letter): void {
    this.diaryStoreService.updateCurrentLetter(row);
    this.router.navigate(['letters/' + row.id]);
  }

  private removeData(letter: Letter) {
    this.diaryStoreService.deleteLetter(letter.id);
    this.storeService.updateEditMode(false);
  }

  private getLetters(): void {
    this.lettersSubscription = this.diaryStoreService.letters$.subscribe(letters => {
      this.letters = letters;
      this.dataSource = new MatTableDataSource(this.letters);
    });
  }
}
