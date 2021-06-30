import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'diary-create-update-tasks-dialog',
  templateUrl: './create-update-tasks-dialog.component.html',
  styleUrls: ['./create-update-tasks-dialog.component.scss']
})
export class CreateUpdateTasksDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateUpdateTasksDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
