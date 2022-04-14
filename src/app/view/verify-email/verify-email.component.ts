import { Component, OnInit } from '@angular/core';
import { User } from '~models/user.model';
import { AuthService } from '~service/auth.service';

@Component({
  selector: 'diary-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  user: User;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.userData;
  }

  resendEmail(): void {
    this.authService.sendVerificationMail();
  }

}
