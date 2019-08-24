import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import {map, catchError, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  LOGIN_URL = 'localhost:3000/login';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
  login(logindata): Observable<any> {
    console.log(logindata);
    return this.http.post<any>('/api/login', logindata, )
      .pipe(map(user => {
         console.log(user);
         if (user.success) {
           localStorage.setItem('currentUser', JSON.stringify({
            token: user.token,
            email: user.user.email,
            isAdmin: user.user.isAdmin,
            name: user.user.name,
            // The below user is used somewhere but I dont't know where as soon as I find out
            // I'll update it here until then for the sake of running please do not change
            // Anything bro
            user: user.user }));
           this.currentUserSubject.next({
            token: user.token,
            email: user.user.email,
            isAdmin: user.user.isAdmin,
            name: user.user.name,
            user: user.user });
           console.log('if print');
           return { success : true, message : 'Authentication Successful'};
         } else {
           console.log('else print');
           return { success : false, message : 'Invalid username or password '};
         }
      })
        ,
        catchError((err) => of({success : false, message : 'Invalid username or password '}) )
      );
  }
}
