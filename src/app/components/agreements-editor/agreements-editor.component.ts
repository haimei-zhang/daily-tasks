import { Component, OnInit } from '@angular/core';
import { StoreService } from '~service/store/store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'diary-agreements-editor',
  templateUrl: './agreements-editor.component.html',
  styleUrls: ['./agreements-editor.component.scss']
})
export class AgreementsEditorComponent implements OnInit {

  isEditMode$: Observable<boolean>;

  constructor(readonly storeService: StoreService) { }

  ngOnInit(): void {
    this.isEditMode$ = this.storeService.isEditMode$;
  }

  edit(): void {
    this.storeService.updateEditMode(true);
  }

  save(): void {

  }

  cancel(): void {
    this.storeService.updateEditMode(false);
  }

}
