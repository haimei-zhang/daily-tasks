import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { CN } from '../assets/i18n/cn';
import { EN } from '../assets/i18n/en';

import { LoadingIndicatorService } from '~service/loading-indicator.service';

@Component({
  selector: 'diary-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoading: boolean;
  isMenuOpen = false;

  constructor(readonly translateService: TranslateService,
              readonly loadingIndicatorService: LoadingIndicatorService) {
    loadingIndicatorService.onLoadingChanged.subscribe(isLoading => setTimeout(() => {
      this.isLoading = isLoading;
    }, 0));

    translateService.setTranslation('cn', CN);
    translateService.setTranslation('en', EN);
    translateService.use('cn');
  }

  changeLanguage(language): void {
    this.translateService.use(language);
  }
}
