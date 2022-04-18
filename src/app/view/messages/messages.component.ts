import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { User } from '~models/user.model';
import { Friend } from '~models/friend.model';
import { Message } from '~models/message.model';

import { INVITATION_STATUS } from '~constants';
import { ConfirmationDialogComponent } from '~components/dialog/confirmation-dialog/confirmation-dialog.component';
import { AuthService } from '~service/auth.service';
import { DiaryStoreService } from '~service/store/diary-store.service';
import { dateToTime } from '~utils/core.util';

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
  message$: Observable<Message[]>;
  message: string;
  newFriendId: string;
  currentFriend: Friend;

  friendsSubscription: Subscription;

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
  }

  refresh(lastRefreshTime): void {
    console.log(lastRefreshTime);
  }

  createMessage(): void {
    if (this.message) {
      const message = {
        notes: this.message,
        authorId: this.user.uid,
        authorName: this.user.displayName,
        createdDate: dateToTime(new Date()),
        editedDate: null,
        toUserId: this.currentFriend.friendId,
        toUserName: this.currentFriend.friendName
      };
      if (this.currentFriend) {
        this.diaryStoreService.createMessage(message);
      }
      this.message = '';
    }
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
    if (this.currentFriend) {
      this.message$ = this.diaryStoreService.getMessagesByFriendId(this.currentFriend.friendId);
    }
  }

  private getUser(): void {
    this.user = this.authService.getLoggedInUser();
  }

  private removeData(data) {
   /* this.messages = this.messages.filter((message) => {
      return message.id !== data.id;
    });*/
  }

  private getFriends(): void {
    this.friendsSubscription = this.diaryStoreService.friends$.subscribe((friends) => {
      this.pendingFriends = friends.filter(friend => friend.status === INVITATION_STATUS.PENDING_ACCEPTED);
      this.connectedFriends = friends.filter(friend => friend.status === INVITATION_STATUS.CONNECTED);
    });
  }

  private getMessages(): void {
    this.message$ = this.diaryStoreService.getMessagesByFriendId(null);
  }
}
