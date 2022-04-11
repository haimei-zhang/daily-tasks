import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '~view/login/login.component';
import { ErrorComponent } from '~view/error/error.component';
import { HomeComponent } from '~view/home/home.component';
import { LettersComponent } from '~view/letters/letters.component';
import { AgreementsComponent } from '~view/agreements/agreements.component';
import { HabitsComponent } from '~view/habits/habits.component';
import { AnnouncementComponent } from '~view/announcement/announcement.component';
import { AnnouncementEditorComponent } from '~components/announcement-editor/announcement-editor.component';
import { BankComponent } from '~view/bank/bank.component';
import { AnalyticsComponent } from '~view/analytics/analytics.component';
import { TimelineComponent } from '~view/timeline/timeline.component';
import { TasksComponent } from '~view/tasks/tasks.component';
import { ShopComponent } from '~view/shop/shop.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'letters', component: LettersComponent},
  {path: 'agreements', component: AgreementsComponent},
  {path: 'habits', component: HabitsComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'announcement', component: AnnouncementComponent},
  {path: 'announcement/:id', component: AnnouncementEditorComponent},
  {path: 'bank', component: BankComponent},
  {path: 'analytics', component: AnalyticsComponent},
  {path: 'timeline', component: TimelineComponent},
  {path: 'shop', component: ShopComponent},
  {path: 'error', component: ErrorComponent},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
