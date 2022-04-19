import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Agreement } from '~models/agreement.model';
import { AGREEMENT_TYPE } from '~constants';

import { StoreService } from '~service/store/store.service';
import { DiaryStoreService } from '~service/store/diary-store.service';
import { AuthService } from '~service/auth.service';
import { dateToTime } from '~utils/core.util';

@Component({
  selector: 'diary-agreements-editor',
  templateUrl: './agreements-editor.component.html',
  styleUrls: ['./agreements-editor.component.scss']
})
export class AgreementsEditorComponent implements OnInit, OnDestroy {

  content: string;
  agreementType: string;
  isEditMode$: Observable<boolean>;
  agreementGeneralRule$: Observable<Agreement>;
  agreementDetailedRule$: Observable<Agreement>;
  agreementGeneralRule: Agreement;
  agreementDetailedRule: Agreement;
  currentAgreement: Agreement;

  agreementGeneralRuleSubscription: Subscription;
  agreementDetailedRuleSubscription: Subscription;
  currentAgreementSubscription: Subscription;

  AGREEMENT_TYPE = AGREEMENT_TYPE;

  constructor(readonly storeService: StoreService,
              readonly authService: AuthService,
              readonly diaryStoreService: DiaryStoreService) {
  }

  ngOnInit(): void {
    this.isEditMode$ = this.storeService.isEditMode$;
    this.getAgreements();
    this.getCurrentAgreement();
  }

  ngOnDestroy(): void {
    this.agreementGeneralRuleSubscription.unsubscribe();
    this.agreementDetailedRuleSubscription.unsubscribe();
    this.currentAgreementSubscription.unsubscribe();
  }

  edit(type: string): void {
    this.storeService.updateEditMode(true);
    this.agreementType = type;
    if (type === AGREEMENT_TYPE.GENERAL_RULE) {
      this.diaryStoreService.updateCurrentAgreement(this.agreementGeneralRule);
      this.content = this.agreementGeneralRule ? this.agreementGeneralRule.content : '';
    }
    if (type === AGREEMENT_TYPE.DETAILED_RULE) {
      this.diaryStoreService.updateCurrentAgreement(this.agreementDetailedRule);
      this.content = this.agreementDetailedRule ? this.agreementDetailedRule.content : '';
    }
  }

  save(): void {
    if (this.content) {
      if (this.agreementType === AGREEMENT_TYPE.GENERAL_RULE) {
        if (!this.agreementGeneralRule) {
          this.addGeneralAgreement();
        } else {
          this.updateGeneralAgreement();
        }
      }
      if (this.agreementType === AGREEMENT_TYPE.DETAILED_RULE) {
        if (!this.agreementDetailedRule) {
          this.addDetailedAgreement();
        } else {
          this.updateDetailedAgreement();
        }
      }
      this.storeService.updateEditMode(false);
    }
  }

  cancel(): void {
    this.storeService.updateEditMode(false);
    this.diaryStoreService.clearCurrentAgreement();
    this.agreementType = '';
    this.content = '';
  }

  private getAgreements(): void {
    this.agreementGeneralRule$ = this.diaryStoreService.agreementGeneralRule$;
    this.agreementGeneralRuleSubscription = this.diaryStoreService.agreementGeneralRule$.subscribe(agreement => {
      this.agreementGeneralRule = agreement;
    });

    this.agreementDetailedRule$ = this.diaryStoreService.agreementDetailedRule$;
    this.agreementDetailedRuleSubscription = this.diaryStoreService.agreementDetailedRule$.subscribe(agreement => {
      this.agreementDetailedRule = agreement;
    });
  }

  private getCurrentAgreement(): void {
    this.currentAgreementSubscription = this.diaryStoreService.currentAgreement$.subscribe(agreement => {
      this.currentAgreement = agreement;
      if (this.currentAgreement) {
        this.content = this.currentAgreement.content;
      }
    });
  }

  private addGeneralAgreement(): void {
    const param = {
      type: this.agreementType,
      content: this.content,
      authorId: this.authService.getLoggedInUser().uid,
      authorName: this.authService.getLoggedInUser().displayName,
      createdDate: dateToTime(new Date()),
      editedDate: null,
      isVisibleToUserIds: []
    } as Agreement;
    this.diaryStoreService.addGeneralRuleAgreement(param);
  }

  private addDetailedAgreement(): void {
    const param = {
      type: this.agreementType,
      content: this.content,
      authorId: this.authService.getLoggedInUser().uid,
      authorName: this.authService.getLoggedInUser().displayName,
      createdDate: dateToTime(new Date()),
      editedDate: null,
      isVisibleToUserIds: []
    } as Agreement;
    this.diaryStoreService.addDetailedRuleAgreement(param);
  }

  private updateGeneralAgreement(): void {
    const param = {
      content: this.content,
      editedDate: dateToTime(new Date()),
      isVisibleToUserIds: []
    } as Agreement;
    this.diaryStoreService.updateGeneralRuleAgreement(param);
  }

  private updateDetailedAgreement(): void {
    const param = {
      content: this.content,
      editedDate: dateToTime(new Date()),
      isVisibleToUserIds: []
    } as Agreement;
    this.diaryStoreService.updateDetailedRuleAgreement(param);
  }
}
