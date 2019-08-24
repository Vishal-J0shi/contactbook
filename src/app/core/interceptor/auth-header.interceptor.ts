import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { LoginService } from '../services/login/login.service';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private readonly AUTH_HEADER = 'Authorization';
  private token: string ;

  constructor(private loginService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    if (this.loginService.currentUserValue) {
      console.log('got here');
      this.token = this.loginService.currentUserValue.token;
    } else {
      console.log('Got in else bro');
    }

    // temp disable uncomment after done
      // if (!req.headers.has('Content-Type')) {
      //     console.log('got in header');
      //     req = req.clone({
      //     headers: req.headers.set('Content-Type', 'application/json')
      //   });
      // }

    req = this.addAuthenticationToken(req);
    console.log('print this if got here');
    console.log(req);
    return next.handle(req);

  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {

    if ( !this.loginService.currentUserValue) {
      return request;
    }

    // If you are calling an outside domain then do not add the token.
    // if (!request.url.match(/www.mydomain.com\//)) {
    //   return request;
    // }

    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, `Bearer ${this.token}`)
    });
  }
}
