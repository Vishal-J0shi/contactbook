import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map, catchError, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  LOGIN_URL = 'localhost:3000/login';

  constructor(private http: HttpClient) { }
  login(logindata): Observable<any> {
    console.log(logindata);
    return this.http.post<any>('/api/login', logindata, )
      .pipe(map(user => {
         console.log(user);
         if (user.success) {
           localStorage.setItem('currentUser', JSON.stringify({email: user.user.email,
            isAdmin: user.user.isAdmin,
            name: user.user.name,
            user: user.user }));
           return { success : true, message : 'Authentication Successful'};
         } else {
           return { success : false, message : 'Invalid username or password '};
         }
      })
        ,
        catchError((err) => of({success : false, message : err.message}) )
      );
  }
}
