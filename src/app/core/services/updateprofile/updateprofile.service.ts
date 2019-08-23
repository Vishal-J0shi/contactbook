import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {map, catchError, } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UpdateprofileService {

  constructor(private http: HttpClient) { }
  updateProfile(logindata): Observable<any> {
    console.log(logindata);
    return this.http.post<any>('/api/updateprofile', logindata, )
      .pipe(map(user => {
         console.log(user);
         if (user.success) {
           localStorage.setItem('currentUser', JSON.stringify({email: user.user.email,
            isAdmin: user.user.isAdmin,
            name: user.user.name,
            user: user.user }));
           return { success : true, message : 'Update Successful'};
         } else {
           return { success : false, message : 'Update failed '};
         }
      })
        ,
        catchError((err) => of({success : false, message : err.message}) )
      );
  }
}
