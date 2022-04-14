export interface Habit {
  id: number;
  name: string;
  completedDate?: number | Date;
  notes?: string;
  authorId?: string;
  authorName?: string;
  isVisible?: boolean;
}
