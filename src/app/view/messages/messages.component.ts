import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { User } from '~models/user.model';

import { MESSAGES } from '~constants';
import { ConfirmationDialogComponent } from '~components/dialog/confirmation-dialog/confirmation-dialog.component';
import { AuthService } from '~service/auth.service';
import { DiaryStoreService } from '~service/store/diary-store.service';

@Component({
  selector: 'diary-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  user: User;
  friends: User[] = [
    {displayName: '大笨蛋', uid: '1', email: '1'},
    {displayName: '大傻子', uid: '2', email: '1'},
    {displayName: '宝宝', uid: '3', email: '1'},
    {displayName: '大变态', uid: '4', email: '1'}
  ];
  avatarSrc = 'assets/images/daily-tasks.jpg';
  messages = MESSAGES;
  message: string;
  friendId: string;

  constructor(public dialog: MatDialog,
              readonly authService: AuthService,
              readonly diaryStoreService: DiaryStoreService) {}

  ngOnInit(): void {
    this.getUser();
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

  addFriend(): void {
    if (this.friendId) {
      this.diaryStoreService.inviteFriend(this.friendId.trim());
    }
  }

  private getUser(): void {
    this.user = this.authService.getLoggedInUser();
  }

  private removeData(data) {
    this.messages = this.messages.filter((message) => {
      return message.id !== data.id;
    });
  }
}
