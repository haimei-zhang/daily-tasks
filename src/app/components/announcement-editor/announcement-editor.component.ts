import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmationDialogComponent } from '~components/dialog/confirmation-dialog/confirmation-dialog.component';
import { DiaryStoreServiceService } from '~service/store/diary-store-service.service';

@Component({
  selector: 'diary-announcement-editor',
  templateUrl: './announcement-editor.component.html',
  styleUrls: ['./announcement-editor.component.scss']
})
export class AnnouncementEditorComponent implements OnInit {

  avatarSrc = 'https://thispersondoesnotexist.com/image';

  name: string;
  content: string;
  currentAnnouncement: any;

  constructor(readonly router: Router,
              public dialog: MatDialog,
              readonly diaryStoreService: DiaryStoreServiceService) { }

  ngOnInit(): void {
    this.diaryStoreService.currentAnnouncement$.subscribe(announcement => {
      if (announcement) {
        this.currentAnnouncement = announcement;
        this.name = announcement.name;
        this.content = announcement.content;
      }
    });
  }

  refresh(event): void {
    console.log(event)
  }

  save(): void {

  }

  cancel(): void {
    this.router.navigate(['announcement']);
  }

  openDeleteConfirmationDialog(): void {
    const config = {
      data: {
        title: 'DIALOG.DELETE_ANNOUNCEMENT',
        content: 'DIALOG.DELETE_ANNOUNCEMENT_MESSAGE'
      }
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, config);
    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.removeData(this.currentAnnouncement.id);
      }
    });
  }

  private removeData(data) {
    console.log(data);
  }

}
