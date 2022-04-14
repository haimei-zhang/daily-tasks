import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { TASKS } from '~constants';
import { DiaryStoreService } from '~service/store/diary-store.service';

@Component({
  selector: 'diary-announcement-table',
  templateUrl: './announcement-table.component.html',
  styleUrls: ['./announcement-table.component.scss']
})
export class AnnouncementTableComponent implements OnInit {

  ELEMENT_DATA = TASKS;

  displayedColumns: string[] = ['name', 'date'];
  dataToDisplay = [...this.ELEMENT_DATA];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(readonly router: Router,
              readonly diaryStoreService: DiaryStoreService) { }

  ngOnInit(): void {
  }

  add(): void {
    this.diaryStoreService.clearCurrentAnnouncement();
    this.router.navigate(['/announcement/new']);
  }

  viewDetails(row): void {
    console.log(row);
    this.diaryStoreService.updateCurrentAnnouncement(row);
    this.router.navigate(['/announcement/' + row.id]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
