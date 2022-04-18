import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '~view/login/login.component';
import { ErrorComponent } from '~view/error/error.component';
import { HomeComponent } from '~view/home/home.component';
import { LettersComponent } from '~view/letters/letters.component';
import { LetterDetailsComponent } from '~components/letter-details/letter-details.component';
import { AgreementsComponent } from '~view/agreements/agreements.component';
import { HabitsComponent } from '~view/habits/habits.component';
import { AnnouncementComponent } from '~view/announcement/announcement.component';
import { AnnouncementEditorComponent } from '~components/announcement-editor/announcement-editor.component';
import { BankComponent } from '~view/bank/bank.component';
import { AnalyticsComponent } from '~view/analytics/analytics.component';
import { TimelineComponent } from '~view/timeline/timeline.component';
import { TasksComponent } from '~view/tasks/tasks.component';
import { ShopComponent } from '~view/shop/shop.component';
import { MessagesComponent } from '~view/messages/messages.component';
import { SignUpComponent } from '~view/sign-up/sign-up.component';
import { ForgotPasswordComponent } from '~view/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '~view/verify-email/verify-email.component';

import { AuthGuard } from '~service/guard/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'verify-email', component: VerifyEmailComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'letters', component: LettersComponent, canActivate: [AuthGuard]},
  {path: 'letters/:id', component: LetterDetailsComponent, canActivate: [AuthGuard]},
  {path: 'agreements', component: AgreementsComponent, canActivate: [AuthGuard]},
  {path: 'habits', component: HabitsComponent, canActivate: [AuthGuard]},
  {path: 'tasks', component: TasksComponent, canActivate: [AuthGuard]},
  {path: 'announcement', component: AnnouncementComponent, canActivate: [AuthGuard]},
  {path: 'announcement/:id', component: AnnouncementEditorComponent, canActivate: [AuthGuard]},
  {path: 'bank', component: BankComponent, canActivate: [AuthGuard]},
  {path: 'analytics', component: AnalyticsComponent, canActivate: [AuthGuard]},
  {path: 'timeline', component: TimelineComponent, canActivate: [AuthGuard]},
  {path: 'shop', component: ShopComponent, canActivate: [AuthGuard]},
  {path: 'messages', component: MessagesComponent, canActivate: [AuthGuard]},
  {path: 'error', component: ErrorComponent},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
