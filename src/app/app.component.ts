import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { CH } from '../assets/i18n/ch';
import { EN } from '../assets/i18n/en';

import { LoadingIndicatorService } from '~service/loading-indicator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'daily-tasks';

  constructor(readonly translateService: TranslateService,
              readonly loadingIndicatorService: LoadingIndicatorService) {
    loadingIndicatorService.onLoadingChanged.subscribe(isLoading => setTimeout(() => {
      const pageLoader = document.querySelector('mosaic-page-loader') as any;
      if (pageLoader && pageLoader.show) {
        if (isLoading) {
          pageLoader.show();
        } else {
          pageLoader.hide();
        }
      }
    }, 0));

    translateService.setTranslation('ch', CH);
    translateService.setTranslation('en', EN);
    translateService.use('ch');
  }
}
