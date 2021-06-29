import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
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

import { AppComponent } from './app.component';
import { LoginComponent } from '~view/login/login.component';
import { ErrorComponent } from '~view/error/error.component';
import { HomeComponent } from '~view/home/home.component';
import { LettersComponent } from '~view/letters/letters.component';
import { AgreementsComponent } from '~view/agreements/agreements.component';
import { HabitsComponent } from '~view/habits/habits.component';
import { AnnouncementComponent } from '~view/announcement/announcement.component';
import { BankComponent } from '~view/bank/bank.component';
import { TasksComponent } from '~view/tasks/tasks.component';
import { AnalyticsComponent } from '~view/analytics/analytics.component';
import { TimelineComponent } from '~view/timeline/timeline.component';
import { SidenavComponent } from '~components/sidenav/sidenav.component';
import { IconsComponent } from '~components/icons/icons.component';
import { PageHeaderComponent } from '~components/page-header/page-header.component';
import { LettersTableComponent } from '~components/letters-table/letters-table.component';
import { LettersEditorComponent } from '~components/letters-editor/letters-editor.component';
import { AgreementsEditorComponent } from '~components/agreements-editor/agreements-editor.component';
import { HabitsContentComponent } from '~components/habits-content/habits-content.component';
import { StoriesTableComponent } from '~components/stories-table/stories-table.component';
import { MoviesTableComponent } from '~components/movies-table/movies-table.component';
import { GamesTableComponent } from '~components/games-table/games-table.component';
import { CreateUpdateHabitsComponent } from '~components/dialog/create-update-habits/create-update-habits.component';
import { TasksTableComponent } from '~components/tasks-table/tasks-table.component';
import { ConfirmationDialogComponent } from '~components/dialog/confirmation-dialog/confirmation-dialog.component';

import { TokenService } from '~service/interceptor/token.service';
import { LoadingIndicatorInterceptorService } from '~service/interceptor/loading-indicator-interceptor.service';
import { LoadingIndicatorService } from '~service/loading-indicator.service';

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
    TasksComponent,
    AnalyticsComponent,
    PageHeaderComponent,
    LettersTableComponent,
    LettersEditorComponent,
    AgreementsEditorComponent,
    HabitsContentComponent,
    StoriesTableComponent,
    MoviesTableComponent,
    GamesTableComponent,
    TimelineComponent,
    CreateUpdateHabitsComponent,
    TasksTableComponent,
    ConfirmationDialogComponent
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
    MatNativeDateModule
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
