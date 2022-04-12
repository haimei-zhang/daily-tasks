import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MESSAGES } from '~constants';
import { ConfirmationDialogComponent } from '~components/dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'diary-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  avatarSrc = 'assets/images/daily-tasks.jpg';
  messages = MESSAGES;
  message: string;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  refresh(lastRefreshTime): void {
    console.log(lastRefreshTime);
  }

  createMessage(): void {
    const message = {
      id: new Date().getTime(),
      notes: this.message,
      name: '笨笨',
      date: new Date()
    };
    this.messages.unshift(message);
    this.message = '';
  }

  openDeleteConfirmationDialog(element): void {
    const config = {
      data: {
        title: 'DIALOG.DELETE_MESSAGE',
        content: 'DIALOG.DELETE_MESSAGE_MESSAGE'
      }
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, config);
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.removeData(element);
      }
    });
  }

  private removeData(data) {
    this.messages = this.messages.filter((message) => {
      return message.id !== data.id;
    });
  }
}
