import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';
import {
  ErrorStateMatcher,
  MatNativeDateModule,
  MatRippleModule,
  ShowOnDirtyErrorStateMatcher
} from '@angular/material/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { A11yModule } from '@angular/cdk/a11y';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { LoginComponent } from '~view/login/login.component';
import { ErrorComponent } from '~view/error/error.component';
import { HomeComponent } from '~view/home/home.component';
import { LettersComponent } from '~view/letters/letters.component';
import { AgreementsComponent } from '~view/agreements/agreements.component';
import { HabitsComponent } from '~view/habits/habits.component';
import { AnnouncementComponent } from '~view/announcement/announcement.component';
import { BankComponent } from '~view/bank/bank.component';
import { AnalyticsComponent } from '~view/analytics/analytics.component';
import { TimelineComponent } from '~view/timeline/timeline.component';
import { TasksComponent } from '~view/tasks/tasks.component';
import { ShopComponent } from '~view/shop/shop.component';
import { MessagesComponent } from '~view/messages/messages.component';
import { SignUpComponent } from '~view/sign-up/sign-up.component';
import { ForgotPasswordComponent } from '~view/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '~view/verify-email/verify-email.component';

import { SidenavComponent } from '~components/sidenav/sidenav.component';
import { IconsComponent } from '~components/icons/icons.component';
import { PageHeaderComponent } from '~components/page-header/page-header.component';
import { LettersTableComponent } from '~components/letters-table/letters-table.component';
import { LettersEditorComponent } from '~components/letters-editor/letters-editor.component';
import { LetterDetailsComponent } from '~components/letter-details/letter-details.component';
import { AgreementsEditorComponent } from '~components/agreements-editor/agreements-editor.component';
import { HabitsContentComponent } from '~components/habits-content/habits-content.component';
import { CreateUpdateHabitsDialogComponent } from '~components/dialog/create-update-habits-dialog/create-update-habits-dialog.component';
import { TasksTableComponent } from '~components/tasks-table/tasks-table.component';
import { ConfirmationDialogComponent } from '~components/dialog/confirmation-dialog/confirmation-dialog.component';
import { AnnouncementTableComponent } from '~components/announcement-table/announcement-table.component';
import { AnnouncementEditorComponent } from '~components/announcement-editor/announcement-editor.component';
import { BankTableComponent } from '~components/bank-table/bank-table.component';
import { CreateUpdateBankDialogComponent } from '~components/dialog/create-update-bank-dialog/create-update-bank-dialog.component';
import { BarChartComponent } from '~components/charts/bar-chart/bar-chart.component';
import { LineChartComponent } from '~components/charts/line-chart/line-chart.component';
import { PieChartComponent } from '~components/charts/pie-chart/pie-chart.component';
import { TableChartComponent } from '~components/charts/table-chart/table-chart.component';
import { CreateUpdateTasksDialogComponent } from '~components/dialog/create-update-tasks-dialog/create-update-tasks-dialog.component';
import { HabitsTableComponent } from '~components/habits-table/habits-table.component';

import { TokenService } from '~service/interceptor/token.service';
import { LoadingIndicatorInterceptorService } from '~service/interceptor/loading-indicator-interceptor.service';
import { LoadingIndicatorService } from '~service/loading-indicator.service';
import { AuthService } from '~service/auth.service';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    HomeComponent,
    SidenavComponent,
    IconsComponent,
    LettersComponent,
    AgreementsComponent,
    HabitsComponent,
    AnnouncementComponent,
    BankComponent,
    AnalyticsComponent,
    PageHeaderComponent,
    LettersTableComponent,
    LettersEditorComponent,
    AgreementsEditorComponent,
    HabitsContentComponent,
    TimelineComponent,
    CreateUpdateHabitsDialogComponent,
    TasksTableComponent,
    ConfirmationDialogComponent,
    AnnouncementTableComponent,
    AnnouncementEditorComponent,
    BankTableComponent,
    CreateUpdateBankDialogComponent,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    TableChartComponent,
    TasksComponent,
    CreateUpdateTasksDialogComponent,
    ShopComponent,
    HabitsTableComponent,
    MessagesComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    LetterDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    TranslateModule.forRoot(),
    ToastrModule.forRoot({timeOut: 10000, closeButton: true, progressBar: true}),
    A11yModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatCardModule,
    MatRippleModule,
    MatGridListModule,
    MatMenuModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: (service: LoadingIndicatorService) => new LoadingIndicatorInterceptorService(service),
      multi: true,
      deps: [LoadingIndicatorService]
    },
    {
      provide: ErrorStateMatcher,
      useClass: ShowOnDirtyErrorStateMatcher
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
