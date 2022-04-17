import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { CN } from '../assets/i18n/cn';
import { EN } from '../assets/i18n/en';
import { User } from '~models/user.model';

import { LoadingIndicatorService } from '~service/loading-indicator.service';
import { AuthService } from '~service/auth.service';

@Component({
  selector: 'diary-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoading: boolean;
  isMenuOpen = false;
  user: User;

  constructor(readonly translateService: TranslateService,
              readonly loadingIndicatorService: LoadingIndicatorService,
              readonly authService: AuthService) {
    loadingIndicatorService.onLoadingChanged.subscribe(isLoading => setTimeout(() => {
      this.isLoading = isLoading;
    }, 0));

    translateService.setTranslation('cn', CN);
    translateService.setTranslation('en', EN);
    translateService.use('cn');
    this.user = authService.getLoggedInUser();
  }

  changeLanguage(language): void {
    this.translateService.use(language);
  }

  logout(): void {
    this.authService.signOut();
  }
}
