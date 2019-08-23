import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map, catchError, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

  constructor(private http: HttpClient) { }
  forgot(logindata): Observable<any> {
    console.log(logindata);
    return this.http.post<any>('/api/forgotpassword', logindata, )
      .pipe(map(user => {
         console.log(user);
         if (user.success) {
           return { success : true, message : 'Request successfull', url: user.url};
         } else {
           return { success : false, message : 'Request Failed'};
         }
      })
        ,
        catchError((err) => of({success : false, message : err.message}) )
      );
  }
}
