import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as R from 'ramda';

import { Habit } from '~models/habit.model';
import { User } from '~models/user.model';
import { dateToTime } from '~utils/core.util';
import { AuthService } from '~service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DiaryStoreService {

  currentAnnouncement: any;

  readonly currentAnnouncementSource = new BehaviorSubject<any>(this.currentAnnouncement);
  currentAnnouncement$ = this.currentAnnouncementSource.asObservable();

  selfCareTasks$ = this.getUserPersonalDataStoreCollection('self_care_tasks') as Observable<Habit[]>;
  sportsTasks$ = this.getUserPersonalDataStoreCollection('sports_tasks') as Observable<Habit[]>;
  studyTasks$ = this.getUserPersonalDataStoreCollection('study_tasks') as Observable<Habit[]>;
  meditationTasks$ = this.getUserPersonalDataStoreCollection('meditation_tasks') as Observable<Habit[]>;
  gameTasks$ = this.getUserPersonalDataStoreCollection('game_tasks') as Observable<Habit[]>;
  challengingTasks$ = this.getUserPersonalDataStoreCollection('challenging_tasks') as Observable<Habit[]>;
  loveTasks$ = this.getUserPersonalDataStoreCollection('love_tasks') as Observable<Habit[]>;
  movieTasks$ = this.getUserPersonalDataStoreCollection('movie_tasks') as Observable<Habit[]>;
  friends$ = this.getUserPersonalDataStoreCollection('friends') as Observable<User[]>;
  messages$ = this.getRootStoreCollection('messages') as Observable<User[]>;

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
      console.log(1111111111)
      this.log(null, 'SUCCESS.DELETE_TASK', 'success');
    }).catch(this.handleError);
  }

  deleteHabit(dbName: string, habit: Habit): void {
    this.getCurrentUserDataCollection().collection(dbName).doc(habit.id).delete().then(() => {
      this.log(null, 'SUCCESS.DELETE_TASK', 'success');
    }).catch(this.handleError);
  }

  updateHabit(dbName: string, habit: Habit): void {
    habit.completedDate = dateToTime(habit.completedDate);
    this.getCurrentUserDataCollection().collection(dbName).doc(habit.id).update(habit).then(() => {
      this.log(null, 'SUCCESS.UPDATE_TASK', 'success');
    }).catch(this.handleError);
  }

  private getObservable(collection: AngularFirestoreCollection<any>): Observable<any> {
    const subject = new BehaviorSubject<any>([]);
    collection.valueChanges({ idField: 'id' }).subscribe(val => {
      subject.next(val);
    });
    return subject;
  }

  private getCurrentUserDataCollection(): AngularFirestoreDocument {
    return this.angularFirestore.collection('users').doc(this.authService.getLoggedInUser().uid).collection('personal_data').doc('1');
  }

  private getUserPersonalDataStoreCollection(collectionName: string): Observable<any> {
    return this.getObservable(this.getCurrentUserDataCollection().collection(collectionName));
  }

  private getRootStoreCollection(collectionName: string): Observable<any> {
    return this.getObservable(this.angularFirestore.collection(collectionName));
  }

  log(message: string, title: string, type?: string, options?: any): void {
    const translatedMessage = message ? this.translateService.instant(message): message;
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
