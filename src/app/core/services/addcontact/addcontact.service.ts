import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map, catchError, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddcontactService {
  LOGIN_URL = 'localhost:3000/login';

  constructor(private http: HttpClient) { }
  addContact(logindata): Observable<any> {
    console.log(logindata);
    return this.http.post<any>('/api/addcontact', logindata, )
      .pipe(map(user => {
         console.log(user);
         if (user.success) {
           return { success : true, message : 'Contact added successfully'};
         } else {
           return { success : false, message : 'Contact not added '};
         }
      })
        ,
        catchError((err) => of({success : false, message : err.message}) )
      );
  }
}
