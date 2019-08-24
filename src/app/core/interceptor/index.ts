import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './auth-header.interceptor';
import { LoginService } from '../services/login/login.service';
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true,  deps: [ LoginService] }, // ,  deps: [ AuthService]
 ];
