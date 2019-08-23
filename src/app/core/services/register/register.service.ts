import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map, catchError, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }
  register(logindata): Observable<any> {
    console.log(logindata);
    return this.http.post<any>('/api/register', logindata, )
      .pipe(map(user => {
         console.log(user);
         if (user.success) {
           return { success : true, message : 'Registration Successful'};
         } else {
           return { success : false, message : 'Registration failed '};
         }
      })
        ,
        catchError((err) => of({success : false, message : err.message}) )
      );
  }
}
