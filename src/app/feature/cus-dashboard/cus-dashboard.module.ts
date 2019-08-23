import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CusDashboardComponent } from './cus-dashboard/cus-dashboard.component';
import { CusRoutingModule } from './cus-routing.module';
import { MaterialModule } from '@/material/material.module';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactComponent, EditContactComponent } from './contact/contact.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddcontactComponent } from './addcontact/addcontact.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { UserComponent, EditUserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { AdduserComponent } from './adduser/adduser.component';



@NgModule({
  declarations: [CusDashboardComponent,
    ChangePasswordComponent,
    ContactComponent,
    AddcontactComponent,
    EditContactComponent,
    EditUserComponent,
    UserComponent,
    ProfileComponent,
    AdduserComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FormsModule,

    CusRoutingModule
  ],
  entryComponents: [
    EditContactComponent,
    EditUserComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true, disableClose: true, } },
  ],
})
export class CusDashboardModule { }
