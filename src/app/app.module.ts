import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from '~view/login/login.component';
import { TokenService } from '~service/interceptor/token.service';
import { LoadingIndicatorInterceptorService } from '~service/interceptor/loading-indicator-interceptor.service';
import { LoadingIndicatorService } from '~service/loading-indicator.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    ToastrModule.forRoot({timeOut: 10000, closeButton: true, progressBar: true}),
    MatButtonModule
  ],
  providers:  [
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
