import { User } from './user.model';

export interface Habit {
  name: string;
  author: User;
  date: number | Date;
  notes: string;
}
