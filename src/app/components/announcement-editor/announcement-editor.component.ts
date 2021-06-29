import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(readonly router: Router,
              readonly diaryStoreService: DiaryStoreServiceService) { }

  ngOnInit(): void {
    this.diaryStoreService.currentAnnouncement$.subscribe(announcement => {
      if (announcement) {
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

}
