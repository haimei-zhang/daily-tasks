import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'diary-create-habits',
  templateUrl: './create-habits.component.html',
  styleUrls: ['./create-habits.component.scss']
})
export class CreateHabitsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateHabitsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
