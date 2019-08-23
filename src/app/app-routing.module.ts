import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login',  component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'forgotpassword', component: ForgotPasswordComponent},
  { path: 'generatepassword/:id', component: ResetpasswordComponent},
  { path: 'dashboard', canActivate: [AuthGuard] , loadChildren:
   () => import('@/feature/cus-dashboard/cus-dashboard.module').then(mod => mod.CusDashboardModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
