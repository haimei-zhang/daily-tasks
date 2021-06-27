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

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from '~view/login/login.component';
import { ErrorComponent } from '~view/error/error.component';
import { HomeComponent } from '~view/home/home.component';
import { SidenavComponent } from '~components/sidenav/sidenav.component';
import { IconsComponent } from '~components/icons/icons.component';

import { TokenService } from '~service/interceptor/token.service';
import { LoadingIndicatorInterceptorService } from '~service/interceptor/loading-indicator-interceptor.service';
import { LoadingIndicatorService } from '~service/loading-indicator.service';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    HomeComponent,
    SidenavComponent,
    IconsComponent
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
    MatGridListModule
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
