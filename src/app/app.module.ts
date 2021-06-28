import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { TranslateModule } from '@ngx-translate/core';

import { ErrorStateMatcher, MatRippleModule, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { AppRoutingModule } from './app-routing.module';
import { MatTableModule } from '@angular/material/table';

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
import { SidenavComponent } from '~components/sidenav/sidenav.component';
import { IconsComponent } from '~components/icons/icons.component';
import { PageHeaderComponent } from '~components/page-header/page-header.component';
import { LettersTableComponent } from '~components/letters-table/letters-table.component';
import { LettersEditorComponent } from '~components/letters-editor/letters-editor.component';

import { TokenService } from '~service/interceptor/token.service';
import { LoadingIndicatorInterceptorService } from '~service/interceptor/loading-indicator-interceptor.service';
import { LoadingIndicatorService } from '~service/loading-indicator.service';
import { MatFormFieldModule } from '@angular/material/form-field';

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
    LettersEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    TranslateModule.forRoot(),
    ToastrModule.forRoot({timeOut: 10000, closeButton: true, progressBar: true}),
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
    MatCardModule,
    MatRippleModule,
    MatGridListModule,
    MatMenuModule,
    MatTableModule,
    MatFormFieldModule
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
