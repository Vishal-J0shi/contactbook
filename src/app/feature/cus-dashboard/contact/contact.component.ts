import { Component, OnInit, Inject, ApplicationRef } from '@angular/core';
import { GetcontactService } from '@/core/services/getcontact/getcontact.service';
import { DeleteContactService } from '@/core/services/deletecontact/delete-contact.service';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ForgotPasswordComponent } from '@/pages/forgot-password/forgot-password.component';
import { EditcontactService } from '@/core/services/editcontact/editcontact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contacts: [];

  constructor(private getcontactservice: GetcontactService, private deleteContact: DeleteContactService,
              private snackBar: MatSnackBar, private dialog: MatDialog,
              private appRef: ApplicationRef ) { }

  ngOnInit() {
    this.getcontactservice.getcontact({userId: JSON.parse(localStorage.getItem('currentUser')).email})
    .subscribe((data) => {
      if (data.success) {
        console.log(data.contacts);

        data.contacts.sort((a, b) => {
          const aName = a.name.toUpperCase();
          const bName = b.name.toUpperCase();
          console.log(`Aname: ${aName} and Bname: ${bName}`);
          if (aName < bName) {
            return -1;
          }
          if (aName > bName) {
            return 1;
          }

          return 0;

        });
        this.contacts = data.contacts;
        console.log(this.contacts);
        // console.log(newArray);
        // this.contacts = data.contacts;
        console.log( 'length: ' + this.contacts.length);
      }
    });
  }
  openSnackBarSuccess() {
    this.snackBar.open('Contact Deleted', 'Close', {
      duration: 2000,
      panelClass: ['style-success'],
    });
  }

  onDelete(uid, index) {
   if (confirm(`Are you sure to delete contact`)) {
      // add service call
    console.log(uid);
    this.deleteContact.deletecontact(uid)
    .subscribe((data) => {
      if (data.success) {
        this.contacts.splice(index, 1);
        this.openSnackBarSuccess();
      }
    });
  }
  }

  editDialog(contact) {
    this.dialog.open( EditContactComponent , { disableClose: true,
      data: contact,
    });

    this.dialog.afterAllClosed.subscribe(result => {
      console.log('Well the dialog is closed');
      this.appRef.tick();
      // this.loginForm.reset();
      // re update start
      this.getcontactservice.getcontact({userId: JSON.parse(localStorage.getItem('currentUser')).email})
    .subscribe((data) => {
      if (data.success) {
        console.log(data.contacts);

        data.contacts.sort((a, b) => {
          const aName = a.name.toUpperCase();
          const bName = b.name.toUpperCase();
          console.log(`Aname: ${aName} and Bname: ${bName}`);
          if (aName < bName) {
            return -1;
          }
          if (aName > bName) {
            return 1;
          }

          return 0;

        });
        this.contacts = data.contacts;
        console.log(this.contacts);
        // console.log(newArray);
        // this.contacts = data.contacts;
        console.log( 'length: ' + this.contacts.length);
      }
    });
      // re update ends

    });
  }

}

@Component({
  selector: 'app-edit-contact',
  templateUrl: 'edit-contact.component.html',
  styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit {

editContactForm: FormGroup;
submitted = false;

private forgotData = {
  userInput: ''
};

createForm() {
  this.editContactForm = this.formBuilder.group({
    id: [],
    email: ['', [Validators.required]],
    address: ['', [Validators.required]],
    name: [],
    phone: []
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
constructor(@Inject(MAT_DIALOG_DATA) public data: any,
            public dialogRef: MatDialogRef<EditContactComponent>,
            private router: Router, private formBuilder: FormBuilder,
            private snackBar: MatSnackBar, private editcontactservice: EditcontactService,
            private appRef: ApplicationRef
            ) {

  }

  ngOnInit(): void {
    this.createForm();
    this.editContactForm.patchValue({
    id: this.data._id,
    email: this.data.email,
    address: this.data.address,
    name: this.data.name,
    phone: this.data.phone
    });

  }

  onSubmit() {
   // add service call
   this.editcontactservice.editcontact(this.editContactForm.value)
   .subscribe((data) => {
     if (data.success) {
       this.openSnackBarSuccess();
       this.dialogRef.close();
       this.appRef.tick();
      //  this.router.navigateByUrl('/dashboard/contact');
     } else {
        this.openSnackBarFail();
     }
   });


 }

 closeDialog() {
   this.router.navigateByUrl('/dashboard/contact').finally(() => {
     this.dialogRef.close('closed'); }
   );

 }

}
