import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map, catchError, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeleteContactService {

  constructor(private http: HttpClient) { }
  deletecontact(logindata): Observable<any> {
    console.log(logindata);
    return this.http.post<any>('/api/deletecontact', { id: logindata}, )
      .pipe(map(user => {
         console.log(user);
         if (user.success) {
           return { success : true, message : 'Successful'};
         } else {
           return { success : false, message : 'user not deleted '};
         }
      })
        ,
        catchError((err) => of({success : false, message : err.message}) )
      );
  }
}
