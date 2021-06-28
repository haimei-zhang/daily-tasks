import { Component, OnInit } from '@angular/core';
import { StoreService } from '~service/store/store.service';

@Component({
  selector: 'diary-letters-editor',
  templateUrl: './letters-editor.component.html',
  styleUrls: ['./letters-editor.component.scss']
})
export class LettersEditorComponent implements OnInit {

  constructor(readonly storeService: StoreService) { }

  ngOnInit(): void {
  }

  save(): void {

  }

  cancel(): void {
    this.storeService.updateEditMode(false);
  }

}
