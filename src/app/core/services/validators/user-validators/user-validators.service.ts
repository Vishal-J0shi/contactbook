import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timer, throwError, Observable, of } from 'rxjs';
import { debounceTime, switchMap, catchError, map } from 'rxjs/operators';
import { AsyncValidatorFn, AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserValidatorsService {
  CHECK_EMAIL_URL = '/api/checkemail/';

  constructor(private http: HttpClient) { }

  searchEmail(email) {
    // debounce
    return timer(1000)
      .pipe(
        debounceTime(1000),
        switchMap(() => {
          return this.http.get<any>(`${this.CHECK_EMAIL_URL}${email}`);
        }),
        catchError((error) => throwError(error))
      );
  }

  userEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.searchEmail(control.value)
        .pipe(
          map(res => {
            console.log(res);
            if (!res.success) {
              return {userEmailExists: true};
            } else {
            return null;
            }
          }),
          catchError(() => of(null))
        );
    };

  }

}
