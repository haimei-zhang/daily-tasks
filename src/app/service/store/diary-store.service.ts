import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as R from 'ramda';

import { Habit } from '~models/habit.model';
import { dateToTime, getLoggedInUser } from '~utils/core.util';

@Injectable({
  providedIn: 'root'
})
export class DiaryStoreService {

  currentAnnouncement: any;

  readonly currentAnnouncementSource = new BehaviorSubject<any>(this.currentAnnouncement);
  currentAnnouncement$ = this.currentAnnouncementSource.asObservable();

  selfCareTasks$ = this.getObservable(this.getCurrentUserDataCollection().collection('self_care_tasks')) as Observable<Habit[]>;
  sportsTasks$ = this.getObservable(this.getCurrentUserDataCollection().collection('sports_tasks')) as Observable<Habit[]>;
  studyTasks$ = this.getObservable(this.getCurrentUserDataCollection().collection('study_tasks')) as Observable<Habit[]>;
  meditationTasks$ = this.getObservable(this.getCurrentUserDataCollection().collection('meditation_tasks')) as Observable<Habit[]>;
  gameTasks$ = this.getObservable(this.getCurrentUserDataCollection().collection('game_tasks')) as Observable<Habit[]>;
  challengingTasks$ = this.getObservable(this.getCurrentUserDataCollection().collection('challenging_tasks')) as Observable<Habit[]>;
  loveTasks$ = this.getObservable(this.getCurrentUserDataCollection().collection('love_tasks')) as Observable<Habit[]>;
  movieTasks$ = this.getObservable(this.getCurrentUserDataCollection().collection('movie_tasks')) as Observable<Habit[]>;

  constructor(private angularFirestore: AngularFirestore) {
  }

  getObservable(collection: AngularFirestoreCollection<any>): Observable<any> {
    const subject = new BehaviorSubject<any>([]);
    collection.valueChanges({ idField: 'id' }).subscribe(val => {
      subject.next(val);
    });
    return subject;
  }

  getCurrentUserDataCollection(): AngularFirestoreDocument {
    return this.angularFirestore.collection('users').doc(getLoggedInUser().uid).collection('personal_data').doc('1');
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
    this.getCurrentUserDataCollection().collection(dbName).add(habit);
  }

  deleteHabit(dbName: string, habit: Habit): void {
    this.getCurrentUserDataCollection().collection(dbName).doc(habit.id).delete();
  }

  updateHabit(dbName: string, habit: Habit): void {
    habit.completedDate = dateToTime(habit.completedDate);
    this.getCurrentUserDataCollection().collection(dbName).doc(habit.id).update(habit);
  }

}
