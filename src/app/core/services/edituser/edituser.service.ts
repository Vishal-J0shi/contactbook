import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map, catchError, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EdituserService {

  constructor(private http: HttpClient) { }
  edituser(logindata): Observable<any> {
    console.log(logindata);
    return this.http.post<any>('/api/updateuser', logindata, )
      .pipe(map(user => {
         console.log(user);
         if (user.success) {
           return { success : true, message : 'Edit Successful'};
         } else {
           return { success : false, message : 'Edit Fail '};
         }
      })
        ,
        catchError((err) => of({success : false, message : err.message}) )
      );
  }
}
