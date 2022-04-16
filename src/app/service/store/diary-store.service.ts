import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of, pipe } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as R from 'ramda';

import { Habit } from '~models/habit.model';
import { User } from '~models/user.model';
import { Friend } from '~models/friend.model';
import { Message } from '~models/message.model';

import { INVITATION_STATUS } from '~constants';

import { dateToTime } from '~utils/core.util';

import { AuthService } from '~service/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DiaryStoreService {

  currentAnnouncement: any;

  readonly currentAnnouncementSource = new BehaviorSubject<any>(this.currentAnnouncement);
  currentAnnouncement$ = this.currentAnnouncementSource.asObservable();

  selfCareTasks$: Observable<Habit[]> = this.getTasksForCurrentUser('self_care_tasks');
  sportsTasks$: Observable<Habit[]> = this.getTasksForCurrentUser('sports_tasks');
  studyTasks$: Observable<Habit[]> = this.getTasksForCurrentUser('study_tasks');
  meditationTasks$: Observable<Habit[]> = this.getTasksForCurrentUser('meditation_tasks');
  gameTasks$: Observable<Habit[]> = this.getTasksForCurrentUser('game_tasks');
  challengingTasks$: Observable<Habit[]> = this.getTasksForCurrentUser('challenging_tasks');
  loveTasks$: Observable<Habit[]> = this.getTasksForCurrentUser('love_tasks');
  movieTasks$: Observable<Habit[]> = this.getTasksForCurrentUser('movie_tasks');
  friends$: Observable<Friend[]> = this.getFriends();
  messages$: Observable<Message[]>;

  constructor(private toastr: ToastrService,
              private translateService: TranslateService,
              private angularFirestore: AngularFirestore,
              readonly authService: AuthService) {
  }

  updateCurrentAnnouncement(announcement): void {
    this.currentAnnouncement = R.clone(announcement);
    this.currentAnnouncementSource.next(this.currentAnnouncement);
  }

  clearCurrentAnnouncement(): void {
    this.currentAnnouncement = null;
    this.currentAnnouncementSource.next(null);
  }

  getTasksForCurrentUser(dbName): Observable<Habit[]> {
    const loggedInUserId = this.authService.getLoggedInUser().uid;
    const myOwnTasks = this.getObservable(this.angularFirestore.collection(dbName,
      (ref) => ref
        .where('authorId', '==', loggedInUserId)));
    const tasksVisibleToMe = this.getObservable(this.angularFirestore.collection(dbName,
      (ref) => ref
        .where('isVisibleToUserIds', 'array-contains', loggedInUserId)));
    return combineLatest([myOwnTasks, tasksVisibleToMe]).pipe(
      map(([myOwnTasks, tasksVisibleToMe]) => {
        console.log(myOwnTasks.concat(tasksVisibleToMe))
        return myOwnTasks.concat(tasksVisibleToMe)
      })
    );
  }

  createHabit(dbName: string, habit: Habit): void {
    habit.createdDate = dateToTime(habit.createdDate);
    habit.completedDate = dateToTime(habit.completedDate);
    delete habit.title;
    this.angularFirestore.collection(dbName).add(habit).then(() => {
      this.log(null, 'SUCCESS.CREATE_TASK', 'success');
    }).catch(() => this.handleError('ERROR.CREATE_TASK'));
  }

  deleteHabit(dbName: string, habit: Habit): void {
    this.angularFirestore.collection(dbName).doc(habit.id).delete().then(() => {
      this.log(null, 'SUCCESS.DELETE_TASK', 'success');
    }).catch(() => this.handleError('ERROR.DELETE_TASK'));
  }

  updateHabit(dbName: string, habit: Habit): void {
    habit.completedDate = dateToTime(habit.completedDate);
    delete habit.title;
    this.angularFirestore.collection(dbName).doc(habit.id).update(habit).then(() => {
      this.log(null, 'SUCCESS.UPDATE_TASK', 'success');
    }).catch(() => this.handleError('ERROR.UPDATE_TASK'));
  }

  getFriends(): Observable<Friend[]> {
    const loggedInUserId = this.authService.getLoggedInUser().uid;
    return this.getObservable(this.angularFirestore.collection('friends',
        ref => ref.where('authorId', '==', loggedInUserId)));
  }

  inviteFriend(friendId: string): void {
    // this.userInvitesCollection = this.afs.collection('userInvites', (ref) => ref.orderBy('createdOn'));

    // check if it is myself
    if (friendId === this.authService.getLoggedInUser().uid) {
      this.log(null, 'ERROR.USER_IS_MYSELF', 'error');
      return;
    }

    // check whether user exists
    this.findExistingDataInDb('users', 'uid', friendId).subscribe((data) => {
      if (!data?.length) {
        this.log(null, 'ERROR.NO_USER_FOUND', 'error');
        return;
      }

      const friend = data[0].payload.doc.data() as User;
      const loggedInUser = this.authService.getLoggedInUser();
      // check whether friend already exists. Only add it when it doesn't exist
      this.angularFirestore.collection('friends', ref => ref
        .where('friendId', '==', friend.uid)
        .where('authorId', '==', loggedInUser.uid)).snapshotChanges()
        .subscribe((data) => {
        if (data?.length) {
          this.log(null, 'ERROR.USER_ALREADY_EXISTS', 'error');
          return;
        }
        this.addFriendStatusToMyself(friend, loggedInUser);
      });

      // check whether friend already has me. Only add it when the friend doesn't have me
      this.angularFirestore.collection('friends', ref => ref
        .where('authorId', '==', friend.uid)
        .where('friendId', '==', loggedInUser.uid)).snapshotChanges()
        .subscribe((data) => {
        if (data?.length) {
          return;
        }
        this.addFriendStatusToFriend(friend, loggedInUser);
      });

    });
  }

  acceptFriendInvitation(friend: Friend): void {
    const loggedInUser = this.authService.getLoggedInUser();
    // update my connection
    this.updateFriendInvitationStatus(friend.id,
      {status: INVITATION_STATUS.CONNECTED, date: dateToTime(new Date)},
      'ERROR.ACCEPT_INVITATION',
      'SUCCESS.ACCEPT_INVITATION');

    // update my friend's connection
    this.angularFirestore.collection('friends', ref => ref
      .where('authorId', '==', friend.friendId)
      .where('friendId', '==', loggedInUser.uid)).snapshotChanges()
      .subscribe((data) => {
        if (data?.length) {
          return;
        }
        const friendStatusToUpdate = data[0].payload.doc.data() as Friend;
        this.updateFriendInvitationStatus(friendStatusToUpdate.id,
          {status: INVITATION_STATUS.CONNECTED, date: dateToTime(new Date)},
          'ERROR.ACCEPT_INVITATION',
          'SUCCESS.ACCEPT_INVITATION');
      });
  }

  private addFriendStatusToMyself(friend: User, loggedInUser: User): void {
    const friendToBeInvited = {
      friendId: friend.uid,
      friendName: friend.displayName,
      authorId: loggedInUser.uid,
      authorName: loggedInUser.displayName,
      date: dateToTime(new Date()),
      status: INVITATION_STATUS.INVITED
    };
    this.addFriendInvitationStatus(friendToBeInvited);
  }

  private addFriendStatusToFriend(friend: User, loggedInUser: User): void {
    const friendPendingInvitation = {
      friendId: loggedInUser.uid,
      friendName: loggedInUser.displayName,
      authorId: friend.uid,
      authorName: friend.displayName,
      date: dateToTime(new Date()),
      status: INVITATION_STATUS.PENDING_ACCEPTED
    };
    this.addFriendInvitationStatus(friendPendingInvitation);
  }

  private addFriendInvitationStatus(friend: Friend): void {
    this.angularFirestore.collection('friends').add(friend).then(() => {
      this.log(null, 'SUCCESS.INVITE_FRIEND', 'success');
    }).catch(() => this.handleError('ERROR.INVITE_FRIEND'));
  }

  private updateFriendInvitationStatus(friendId: string, friendToUpdate: Friend, error?: string, success?: string): void {
    this.angularFirestore.collection('friends').doc(friendId).update(friendToUpdate).then(() => {
      this.log(null, success, 'success');
    }).catch(() => this.handleError(error));
  }

  private getObservable(collection: AngularFirestoreCollection<any>): Observable<any> {
    const subject = new BehaviorSubject<any>([]);
    collection.valueChanges({idField: 'id'}).subscribe(val => {
      subject.next(val);
    });
    return subject;
  }

  private findExistingDataInDb(dbPath: string, fieldName: string, fieldValue: any): Observable<any> {
    return this.angularFirestore.collection(dbPath, ref => ref.where(fieldName, '==', fieldValue)).snapshotChanges();
  }

  private log(message: string, title: string, type?: string, options?: any): void {
    const translatedMessage = message ? this.translateService.instant(message) : message;
    const translatedTitle = title ? this.translateService.instant(title) : title;
    if (!type) {
      this.toastr.show(translatedMessage, translatedTitle, options);
    } else {
      this.toastr[type](translatedMessage, translatedTitle, options);
    }
  }

  private handleError<T>(err: string) {
    return (error): Observable<T> => {
      if (error.error) {
        console.error(error.error)
        if (typeof error.error === 'string') {
          this.log(error.error, err, 'error');
        } else if (typeof error.error.message === 'string') {
          this.log(error.error.message, err, 'error');
        } else if (typeof error.error.text === 'string') {
          this.log(error.error.text, err, 'error');
        }
      }
      return of();
    };
  }

}
