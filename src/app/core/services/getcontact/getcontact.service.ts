import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map, catchError, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetcontactService {
  LOGIN_URL = 'localhost:3000/login';

  constructor(private http: HttpClient) { }
  getcontact(logindata): Observable<any> {
    console.log(logindata);
    return this.http.post<any>('/api/getcontactsbyid', logindata, )
      .pipe(map(user => {
         console.log(user);
         if (user.success) {
           return { success : true, message : 'Successful', contacts: user.contacts};
         } else {
           return { success : false, message : 'Invalid username or password '};
         }
      })
        ,
        catchError((err) => of({success : false, message : err.message}) )
      );
  }
}
