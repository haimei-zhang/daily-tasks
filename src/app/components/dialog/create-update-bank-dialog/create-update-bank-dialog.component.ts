import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'diary-create-update-bank-dialog',
  templateUrl: './create-update-bank-dialog.component.html',
  styleUrls: ['./create-update-bank-dialog.component.scss']
})
export class CreateUpdateBankDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateUpdateBankDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
