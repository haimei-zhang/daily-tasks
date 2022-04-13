import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '~service/auth.service';

@Component({
  selector: 'diary-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  auth: any;

  constructor(public authService: AuthService,
              readonly route: ActivatedRoute,
              readonly router: Router,
              readonly translateService: TranslateService) {
  }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.signIn(this.username, this.password);
  }

  loginWithGoogle(): void {
    this.authService.googleAuth();
  }

  changeLanguage(language): void {
    this.translateService.use(language);
  }

}
