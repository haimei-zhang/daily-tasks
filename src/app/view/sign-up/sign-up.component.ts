import { Component, OnInit } from '@angular/core';
import { AuthService } from '~service/auth.service';

@Component({
  selector: 'diary-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  username: string;
  email: string;
  password: string;

  constructor(public authService: AuthService,) { }

  ngOnInit(): void {
  }

  signUp(): void {
    this.authService.signUp(this.email, this.password, this.username);
  }

}
