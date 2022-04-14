import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as R from 'ramda';

import { Habit } from '~models/habit.model';
import { dateToTime } from '~utils/core.util';

@Injectable({
  providedIn: 'root'
})
export class DiaryStoreService {

  currentAnnouncement: any;

  readonly currentAnnouncementSource = new BehaviorSubject<any>(this.currentAnnouncement);
  currentAnnouncement$ = this.currentAnnouncementSource.asObservable();

  selfCareTasks$ = this.getObservable(this.angularFirestore.collection('self_care_tasks')) as Observable<Habit[]>;
  sportsTasks$ = this.getObservable(this.angularFirestore.collection('sports_tasks')) as Observable<Habit[]>;
  studyTasks$ = this.getObservable(this.angularFirestore.collection('study_tasks')) as Observable<Habit[]>;
  meditationTasks$ = this.getObservable(this.angularFirestore.collection('meditation_tasks')) as Observable<Habit[]>;
  gameTasks$ = this.getObservable(this.angularFirestore.collection('game_tasks')) as Observable<Habit[]>;
  challengingTasks$ = this.getObservable(this.angularFirestore.collection('challenging_tasks')) as Observable<Habit[]>;
  loveTasks$ = this.getObservable(this.angularFirestore.collection('love_tasks')) as Observable<Habit[]>;
  movieTasks$ = this.getObservable(this.angularFirestore.collection('movie_tasks')) as Observable<Habit[]>;

  constructor(private angularFirestore: AngularFirestore) {
  }

  getObservable(collection: AngularFirestoreCollection<any>): Observable<any> {
    const subject = new BehaviorSubject<any>([]);
    collection.valueChanges({ idField: 'id' }).subscribe(val => {
      subject.next(val);
    });
    return subject;
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
    this.angularFirestore.collection(dbName).add(habit);
  }

  deleteHabit(dbName: string, habit: Habit): void {
    this.angularFirestore.collection(dbName).doc(habit.id).delete();
  }

  updateHabit(dbName: string, habit: Habit): void {
    habit.completedDate = dateToTime(habit.completedDate);
    this.angularFirestore.collection(dbName).doc(habit.id).update(habit);
  }

}
