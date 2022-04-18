export interface Message {
  id?: string;
  createdDate: number;
  editedDate: number;
  notes: string;
  authorId: string;
  authorName: string;
  toUserId: string;
  toUserName: string;
}
