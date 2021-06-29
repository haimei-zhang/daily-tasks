import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from '~components/dialog/confirmation-dialog/confirmation-dialog.component';
import { CreateUpdateBankDialogComponent } from '~components/dialog/create-update-bank-dialog/create-update-bank-dialog.component';

@Component({
  selector: 'diary-bank-table',
  templateUrl: './bank-table.component.html',
  styleUrls: ['./bank-table.component.scss']
})
export class BankTableComponent implements OnInit {

  @Input() user;

  bankStatus = {
    total: 0,
    lastUpdatedTime: new Date()
  };

  bankUser1 = [{
    id: 1,
    type: 'income',
    date: new Date(),
    notes: 'test',
    amount: 1
  }, {
    id: 2,
    type: 'income',
    date: new Date(),
    notes: 'test',
    amount: 2
  }, {
    id: 3,
    type: 'expenses',
    date: new Date(),
    notes: 'test',
    amount: 3
  }];
  bankUser2 = [{
    id: 4,
    type: 'income',
    date: new Date(),
    notes: 'test',
    amount: 1
  }, {
    id: 5,
    type: 'income',
    date: new Date(),
    notes: 'test',
    amount: 2
  }, {
    id: 6,
    type: 'expenses',
    date: new Date(),
    notes: 'test',
    amount: 3
  }];

  dataSource;
  displayedColumns: string[] = ['date', 'notes', 'amount', 'action'];
  dataToDisplay = [];

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.user === 'user1') {
      this.dataToDisplay = this.bankUser1;
    } else {
      this.dataToDisplay = this.bankUser2;
    }
    this.dataSource = new MatTableDataSource(this.dataToDisplay);
  }

  openCreateBankDialog(): void {
    const config = {
      data: {
        title: 'DIALOG.CREATE_BANK',
        amount: 0,
        notes: '',
        date: new Date(),
        type: ''
      }
    };
    const dialogRef = this.dialog.open(CreateUpdateBankDialogComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      this.edit(result);
    });
  }

  openEditBankDialog(element): void {
    element.title = 'DIALOG.EDIT_BANK';
    const config = {
      data: element
    };
    const dialogRef = this.dialog.open(CreateUpdateBankDialogComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      this.edit(result);
    });
  }

  openDeleteConfirmationDialog(element): void {
    const config = {
      data: {
        title: 'DIALOG.DELETE_BANK',
        content: 'DIALOG.DELETE_BANK_MESSAGE'
      }
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, config);
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.removeData(element);
      }
    });
  }

  private edit(element): void {
    console.log(element);
  }

  private removeData(data) {
    console.log(data);
  }

}
