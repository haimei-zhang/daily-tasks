import { Component, OnInit } from '@angular/core';
import { CreateHabitsComponent } from '~components/dialog/create-habits/create-habits.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'diary-habits-content',
  templateUrl: './habits-content.component.html',
  styleUrls: ['./habits-content.component.scss']
})
export class HabitsContentComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openCreateHabitDialog(data?, hasAuthor?): void {
    const config = data ? {data: data} : {
      data: {
        name: '',
        hasAuthor: hasAuthor,
        author: '',
        date: new Date(),
        notes: ''
      }
    };

    const dialogRef = this.dialog.open(CreateHabitsComponent, config);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}
