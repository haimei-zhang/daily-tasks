import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { User } from '~models/user.model';
import { Friend } from '~models/friend.model';
import { Message } from '~models/message.model';

import { INVITATION_STATUS } from '~constants';
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
  pendingFriends: Friend[];
  connectedFriends: Friend[];
  avatarSrc = 'assets/images/daily-tasks.jpg';
  messages: Message[];
  message: string;
  newFriendId: string;
  currentFriend: Friend;

  friendsSubscription: Subscription;
  messageSubscription: Subscription;

  constructor(public dialog: MatDialog,
              readonly authService: AuthService,
              readonly diaryStoreService: DiaryStoreService) {}

  ngOnInit(): void {
    this.getUser();
    this.getFriends();
    this.getMessages();
  }

  ngOnDestroy(): void {
    this.friendsSubscription.unsubscribe();
    this.messageSubscription.unsubscribe();
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
    // this.messages.unshift(message);
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
    if (this.newFriendId) {
      this.diaryStoreService.inviteFriend(this.newFriendId.trim());
    }
  }

  acceptInvitation(friend: Friend): void {
    this.diaryStoreService.acceptFriendInvitation(friend);
  }

  selectCurrentFriend(friend: Friend): void {
    this.currentFriend = friend;
  }

  private getUser(): void {
    this.user = this.authService.getLoggedInUser();
  }

  private removeData(data) {
    this.messages = this.messages.filter((message) => {
      return message.id !== data.id;
    });
  }

  private getFriends(): void {
    this.friendsSubscription = this.diaryStoreService.friends$.subscribe((friends) => {
      this.pendingFriends = friends.filter(friend => friend.status === INVITATION_STATUS.PENDING_ACCEPTED);
      this.connectedFriends = friends.filter(friend => friend.status === INVITATION_STATUS.CONNECTED);
    });
  }

  private getMessages(): void {
    this.diaryStoreService.getMessages(this.currentFriend.friendId);
    this.messageSubscription = this.diaryStoreService.messages$.subscribe((messages) => {
      if (this.currentFriend) {
        this.messages = messages;
      }
    });
  }
}
