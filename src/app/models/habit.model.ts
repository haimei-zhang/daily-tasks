export interface Habit {
  id: number;
  name: string;
  completedDate?: number | Date;
  notes?: string;
}
