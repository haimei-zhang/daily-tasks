export interface Agreement {
  id?: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdDate: number;
  editedDate?: number;
  isVisibleToUserIds?: string[];
}
