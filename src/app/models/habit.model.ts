export interface Habit {
  id: string;
  name: string;
  completedDate?: number | Date;
  notes?: string;
  authorId?: string;
  authorName?: string;
  isVisible?: boolean;
}
