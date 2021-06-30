import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'diary-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(readonly route: ActivatedRoute,
              readonly router: Router,
              readonly translateService: TranslateService) {
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.username === 'test' && this.password === 'test') {
      this.router.navigate(['home']);
    }
  }

  changeLanguage(language): void {
    this.translateService.use(language);
  }

}
