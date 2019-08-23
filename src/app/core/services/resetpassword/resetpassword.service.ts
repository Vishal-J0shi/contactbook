import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map, catchError, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {

  constructor(private http: HttpClient) { }
  resetpassword(logindata): Observable<any> {
    console.log(logindata);
    return this.http.post<any>('/api/resetpassword', logindata, )
      .pipe(map(user => {
         console.log(user);
         if (user.success) {
           return { success : true, message : 'Request successfull'};
         } else {
           return { success : false, message : 'Request Failed'};
         }
      })
        ,
        catchError((err) => of({success : false, message : err.message}) )
      );
  }

  verifyToken(data): Observable<any> {
    console.log(data);
    return this.http.post<any>('/api/verifytoken', data, )
      .pipe(map(user => {
         console.log(user);
         if (user.success) {
           return { success : true, message : 'Request successfull'};
         } else {
           return { success : false, message : 'Request Failed'};
         }
      })
        ,
        catchError((err) => of({success : false, message : err.message}) )
      );
  }
}
