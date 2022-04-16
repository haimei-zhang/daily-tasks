import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
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

@Injectable({
  providedIn: 'root'
})
export class DiaryStoreService {

  currentAnnouncement: any;

  readonly currentAnnouncementSource = new BehaviorSubject<any>(this.currentAnnouncement);
  currentAnnouncement$ = this.currentAnnouncementSource.asObservable();

  selfCareTasks$ = this.getUserPersonalDataStoreCollectionObservable('self_care_tasks') as Observable<Habit[]>;
  sportsTasks$ = this.getUserPersonalDataStoreCollectionObservable('sports_tasks') as Observable<Habit[]>;
  studyTasks$ = this.getUserPersonalDataStoreCollectionObservable('study_tasks') as Observable<Habit[]>;
  meditationTasks$ = this.getUserPersonalDataStoreCollectionObservable('meditation_tasks') as Observable<Habit[]>;
  gameTasks$ = this.getUserPersonalDataStoreCollectionObservable('game_tasks') as Observable<Habit[]>;
  challengingTasks$ = this.getUserPersonalDataStoreCollectionObservable('challenging_tasks') as Observable<Habit[]>;
  loveTasks$ = this.getUserPersonalDataStoreCollectionObservable('love_tasks') as Observable<Habit[]>;
  movieTasks$ = this.getUserPersonalDataStoreCollectionObservable('movie_tasks') as Observable<Habit[]>;
  friends$ = this.getUserPersonalDataStoreCollectionObservable('friends') as Observable<Friend[]>;
  messages$ = this.getRootStoreCollectionObservable('messages') as Observable<Message[]>;

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

  createHabit(dbName: string, habit: Habit): void {
    habit.completedDate = dateToTime(habit.completedDate);
    this.getCurrentUserDataCollection().collection(dbName).add(habit).then(() => {
      this.log(null, 'SUCCESS.CREATE_TASK', 'success');
    }).catch(() => this.handleError('ERROR.CREATE_TASK'));
  }

  deleteHabit(dbName: string, habit: Habit): void {
    this.getCurrentUserDataCollection().collection(dbName).doc(habit.id).delete().then(() => {
      this.log(null, 'SUCCESS.DELETE_TASK', 'success');
    }).catch(() => this.handleError('ERROR.DELETE_TASK'));
  }

  updateHabit(dbName: string, habit: Habit): void {
    habit.completedDate = dateToTime(habit.completedDate);
    this.getCurrentUserDataCollection().collection(dbName).doc(habit.id).update(habit).then(() => {
      this.log(null, 'SUCCESS.UPDATE_TASK', 'success');
    }).catch(() => this.handleError('ERROR.UPDATE_TASK'));
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
      // check whether friend already exists. Only add it when it doesn't exist
      this.findExistingDataInDb(this.getCurrentUserDataPath() + '/friends', 'friendUid', friend.uid).subscribe((data) => {
        if (data?.length) {
          this.log(null, 'ERROR.USER_ALREADY_EXISTS', 'error');
          return;
        }
        this.addFriendStatusToMyself(friend);
      });

      // check whether friend already has me. Only add it when it doesn't exist
      this.findExistingDataInDb('users/' + friend.uid + '/personal_data/1/friends', 'friendUid', friend.uid).subscribe((data) => {
        if (data?.length) {
          return;
        }
        this.addFriendStatusToFriend(friend);
      });

    });
  }

  addFriendStatusToMyself(friend: User): void {
    const friendToBeInvited = {
      friendUid: friend.uid,
      friendDisplayName: friend.displayName,
      createdDate: dateToTime(new Date()),
      status: INVITATION_STATUS.INVITED
    };
    this.getCurrentUserDataCollection().collection('friends').add(friendToBeInvited).then(() => {
      this.log(null, 'SUCCESS.INVITE_FRIEND', 'success');
    }).catch(() => this.handleError('ERROR.INVITE_FRIEND'));
  }

  addFriendStatusToFriend(friend: User): void {
    const friendSendingRequest = {
      friendUid: this.authService.getLoggedInUser().uid,
      friendDisplayName: this.authService.getLoggedInUser().displayName,
      createdDate: dateToTime(new Date()),
      status: INVITATION_STATUS.PENDING_ACCEPTED
    };
    this.angularFirestore.collection('users/' + friend.uid + '/personal_data/1/friends').add(friendSendingRequest).then(() => {
      this.log(null, 'SUCCESS.INVITE_FRIEND', 'success');
    }).catch(() => this.handleError('ERROR.INVITE_FRIEND'));
  }

  acceptFriendInvitation(friend: Friend): void {
    // update my friend connection
    this.getCurrentUserDataCollection().collection('friends').doc(friend.id)
      .set({status: INVITATION_STATUS.CONNECTED}, {merge: true})
      .then(() => {this.log(null, 'SUCCESS.ACCEPT_INVITATION', 'success');})
      .catch(() => this.handleError('ERROR.ACCEPT_INVITATION'));

    // update my friend's connection
    this.findExistingDataInDb('users/' + friend.friendUid + '/personal_data/1/friends', 'friendUid',
      this.authService.getLoggedInUser().uid).subscribe(data => {
      if (data?.length) {
        return;
      }
      this.angularFirestore.collection('users/' + friend.friendUid + '/personal_data/1/friends').doc(data.id)
        .set({status: INVITATION_STATUS.CONNECTED}, {merge: true})
        .catch(() => this.handleError('ERROR.ACCEPT_INVITATION'));
    });
  }

  private getObservable(collection: AngularFirestoreCollection<any>): Observable<any> {
    const subject = new BehaviorSubject<any>([]);
    collection.valueChanges({idField: 'id'}).subscribe(val => {
      subject.next(val);
    });
    return subject;
  }

  private getCurrentUserDataCollection(): AngularFirestoreDocument {
    return this.angularFirestore.collection('users').doc(this.authService.getLoggedInUser().uid).collection('personal_data').doc('1');
  }

  private getCurrentUserDataPath(): string {
    return 'users/' + this.authService.getLoggedInUser().uid + '/personal_data/1';
  }

  private getUserPersonalDataStoreCollectionObservable(collectionName: string): Observable<any> {
    return this.getObservable(this.getCurrentUserDataCollection().collection(collectionName));
  }

  private getRootStoreCollectionObservable(collectionName: string): Observable<any> {
    return this.getObservable(this.angularFirestore.collection(collectionName));
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
