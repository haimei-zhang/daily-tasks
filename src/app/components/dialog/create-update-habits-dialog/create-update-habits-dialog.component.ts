import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'diary-create-update-habits',
  templateUrl: './create-update-habits-dialog.component.html',
  styleUrls: ['./create-update-habits-dialog.component.scss']
})
export class CreateUpdateHabitsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateUpdateHabitsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
