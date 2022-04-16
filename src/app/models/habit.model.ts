export interface Habit {
  id: string;
  name: string;
  notes?: string;
  createdDate?: number;
  completedDate?: number | Date;
  isCompletedToday?: boolean;
  authorId?: string;
  authorName?: string;
  isVisibleToUserIds?: string[];
  title?: string;
}
