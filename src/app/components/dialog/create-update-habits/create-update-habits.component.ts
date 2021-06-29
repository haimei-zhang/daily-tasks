import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'diary-create-update-habits',
  templateUrl: './create-update-habits.component.html',
  styleUrls: ['./create-update-habits.component.scss']
})
export class CreateUpdateHabitsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateUpdateHabitsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
