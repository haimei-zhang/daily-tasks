import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, shareReplay, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient,
              private toastr: ToastrService) {
  }

  standardGet(url: string, err: string, success?: any, httpOptions?: any): Observable<any> {
    return this.http.get(url, httpOptions).pipe(
      tap(() => {
        if (success) {
          this.log(null, `${success}`, 'success');
        }
      }),
      shareReplay(1),
      catchError(this.handleError(err))
    );
  }

  standardPut(url: string, body: any, err: string, success?: string, httpOptions?: any): Observable<any> {
    return this.http.put(url, body, httpOptions).pipe(
      tap(() => {
        if (success) {
          this.log(null, `${success}`, 'success');
        }
      }),
      catchError(this.handleError(err))
    );
  }

  standardPost(url: string, body: any, err: string, success?: string, httpOptions?: any): Observable<any> {
    return this.http.post(url, body, httpOptions).pipe(
      tap(() => {
        if (success) {
          this.log(null, `${success}`, 'success');
        }
      }),
      catchError(this.handleError(err))
    );
  }

  formsPost(url: string, arr: any, err: string, success?: string): Observable<any> {
    if (arr.length) {
      const formData = new FormData();
      for (const element of arr) {
        formData.append(element.key, element.value);
      }
      return this.http.post(url, formData).pipe(
        tap(() => {
          if (success) {
            this.log(null, `${success}`, 'success');
          }
        }),
        catchError(this.handleError(err))
      );
    }
  }

  formPost(url: string, body: any, err: string, success?: string): Observable<any> {
    const formData = new FormData();
    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        formData.append(key, body[key]);
      }
    }
    return this.http.post(url, formData).pipe(
      tap(() => {
        if (success) {
          this.log(null, `${success}`, 'success');
        }
      }),
      catchError(this.handleError(err))
    );
  }

  standardDelete(url: string, err: string, success?: string, httpOptions?: any): Observable<any> {
    return this.http.delete(url, httpOptions).pipe(
      tap(() => {
        if (success) {
          this.log(null, `${success}`, 'success');
        }
      }, error => this.log(null, `${error}`, 'error')),
      catchError(this.handleError(err))
    );
  }

  log(message: string, title: string, type?: string, options?: any): void {
    if (!type) {
      this.toastr.show(message, title, options);
    } else {
      this.toastr[type](message, title, options);
    }
  }

  private handleError<T>(err: string) {
    return (error): Observable<T> => {
      if (error.error) {
        console.error(error.error)
        if (typeof error.error === 'string') {
          this.log(error.error, err, 'error');
        } else if (typeof error.error.message === 'string') {
          this.log(error.error.message, err, 'error');
        } else if (typeof error.error.text === 'string') {
          this.log(error.error.text, err, 'error');
        }
      }
      return of();
    };
  }
}
