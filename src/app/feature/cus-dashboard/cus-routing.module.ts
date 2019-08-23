import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CusDashboardComponent } from './cus-dashboard/cus-dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ContactComponent } from './contact/contact.component';
import { AddcontactComponent } from './addcontact/addcontact.component';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { AdduserComponent } from './adduser/adduser.component';

const routes: Routes = [
  { path: '', component: CusDashboardComponent, 
  children: [
     { path: '', component: ContactComponent},
     { path: 'contact', redirectTo: ''},
     { path: 'changepassword', component: ChangePasswordComponent},
     { path: 'addcontact', component: AddcontactComponent},
     { path: 'user', component: UserComponent},
     { path: 'profile', component: ProfileComponent},
     { path: 'adduser', component: AdduserComponent}
  ]}
  ];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CusRoutingModule { }
