import { Component, OnInit, Inject } from '@angular/core';
import { GetcontactService } from '@/core/services/getcontact/getcontact.service';
import { DeleteContactService } from '@/core/services/deletecontact/delete-contact.service';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EditcontactService } from '@/core/services/editcontact/editcontact.service';
import { GetusersService } from '@/core/services/getusers/getusers.service';
import { DeleteuserService } from '@/core/services/deleteuser/deleteuser.service';
import { EdituserService } from '@/core/services/edituser/edituser.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: [];

  constructor(private getcontactservice: GetusersService, private deleteContact: DeleteuserService,
              private snackBar: MatSnackBar, private dialog: MatDialog ) { }

  ngOnInit() {
    this.getcontactservice.getusers()
    .subscribe((data) => {
      if (data.success) {
        this.users = data.users;
        console.log( 'length: ' + this.users.length);
      }
    });
  }
  openSnackBarSuccess() {
    this.snackBar.open('user Deleted', 'Close', {
      duration: 2000,
      panelClass: ['style-success'],
    });
  }

  onDelete(uid, index) {
    // add service call
    console.log(uid);
    this.deleteContact.deleteuser(uid)
    .subscribe((data) => {
      if (data.success) {
        this.users.splice(index, 1);
        this.openSnackBarSuccess();
      }
    });
  }

  editDialog(user) {
    this.dialog.open( EditUserComponent , { disableClose: true,
      data: user,
    });

    this.dialog.afterAllClosed.subscribe(result => {
      // this.loginForm.reset();
      this.getcontactservice.getusers()
      .subscribe((data) => {
        if (data.success) {
          this.users = data.users;
          console.log( 'length: ' + this.users.length);
        }
      });
    });
  }

}

@Component({
  selector: 'app-edit-user',
  templateUrl: 'edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

editUserForm: FormGroup;
submitted = false;

createForm() {
  this.editUserForm = this.formBuilder.group({
    id: [],
    email: ['', [Validators.required]],
    name: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    password : [null, []],
    confirmpassword: [null, [this.passwordMatcher.bind(this)]]
  });
}

resetForm(form: FormGroup) {
  form.reset();
  Object.keys(form.controls).forEach(key => {
    form.get(key).setErrors(null) ;
  });
}

openSnackBarSuccess() {
  this.snackBar.open('Edit successful', 'Close', {
    duration: 4000,
    panelClass: ['style-success'],
  });
}
openSnackBarFail() {
  this.snackBar.open('Edit failed', 'Close', {
    duration: 2000,
    panelClass: ['style-success'],
  });
}

// Password Match Validator
private passwordMatcher(control: FormControl): { [s: string]: boolean } {
  if (
    this.editUserForm &&
    (control.value !== this.editUserForm.controls.password.value)
  ) {
    return { passwordNotMatch: true };
  }
  return null;
}
constructor(@Inject(MAT_DIALOG_DATA) public data: any,
            public dialogRef: MatDialogRef<EditUserComponent>,
            private router: Router, private formBuilder: FormBuilder,
            private snackBar: MatSnackBar, private edituserservice: EdituserService
            ) {

  }

  ngOnInit(): void {
    this.createForm();
    this.editUserForm.patchValue({
    id: this.data._id,
    email: this.data.email,
    address: this.data.address,
    name: this.data.name,
    phone: this.data.phone
    });

  }
  get confirmpassword() { return this.editUserForm.get('confirmpassword'); }

  onSubmit() {
   // add service call
   if (this.editUserForm.valid) {this.edituserservice.edituser(this.editUserForm.value)
   .subscribe((data) => {
     if (data.success) {
       this.openSnackBarSuccess();
       this.dialogRef.close();
       this.router.navigateByUrl('/dashboard/user');
     } else {
        this.openSnackBarFail();
     }
   });}


 }

 closeDialog() {
   this.router.navigateByUrl('/dashboard/user').finally(() => {
     this.dialogRef.close('closed'); }
   );

 }

}
