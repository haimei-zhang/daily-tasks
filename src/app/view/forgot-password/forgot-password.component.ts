import { Component, OnInit } from '@angular/core';
import { AuthService } from '~service/auth.service';

@Component({
  selector: 'diary-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  email: string;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  resetPassword(): void {
    this.authService.forgotPassword(this.email);
  }

}
