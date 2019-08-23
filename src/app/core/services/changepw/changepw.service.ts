import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map, catchError, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChangepwService {
  LOGIN_URL = 'localhost:3000/login';

  constructor(private http: HttpClient) { }
  changepassword(logindata): Observable<any> {
    console.log(logindata);
    return this.http.post<any>('/api/changepassword', logindata, )
      .pipe(map(user => {
         console.log(user);
         if (user.success) {
           return { success : true, message : 'Authentication Successful'};
         }
         if (!user.success && user.code === 0) {
          return {code: 0};
        }
         if (!user.success && user.code === 1) {
          return {code: 1};
        }
      })
        ,
        catchError((err) => of({success : false, message : err.message}) )
      );
  }
}
