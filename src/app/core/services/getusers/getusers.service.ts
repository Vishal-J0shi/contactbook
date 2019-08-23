import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map, catchError, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetusersService {
  LOGIN_URL = 'localhost:3000/login';

  constructor(private http: HttpClient) { }
  getusers(): Observable<any> {
    console.log();
    return this.http.get<any>('/api/getusers')
      .pipe(map(user => {
         console.log(user);
         if (user.success) {
           return { success : true, message : ' Got user Successful', users: user.users};
         } else {
           return { success : false, message : 'Get Users fail '};
         }
      })
        ,
        catchError((err) => of({success : false, message : err.message}) )
      );
  }
}
