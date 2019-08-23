import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { RegisterService } from '@/core/services/register/register.service';
import { Router } from '@angular/router';
import { AddcontactService } from '@/core/services/addcontact/addcontact.service';
import { UserValidatorsService } from '@/core/services/validators/user-validators/user-validators.service';


@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.css']
})
export class AddcontactComponent implements OnInit {
  addContactForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private cd: ChangeDetectorRef,
              private snackBar: MatSnackBar, private addcontactservice: AddcontactService,
              private router: Router, private validator: UserValidatorsService) { }

  createForm() {
    this.addContactForm = this.formBuilder.group({
      userId: [''],
      profile: [null ],
      email: ['', [Validators.required, Validators.email], [this.validator.userEmailValidator()] ],
      address: ['', [Validators.required]],
      name: ['', [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern( '[0-9]{0,10}')]]
    });
  }
  get email() {return this.addContactForm.get('email'); }

  resetForm(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null) ;
    });
  }

  openSnackBarSuccess() {
    this.snackBar.open('Contact added successfully', 'Close', {
      duration: 4000,
      panelClass: ['style-success'],
    });
  }
  openSnackBarFail() {
    this.snackBar.open('Registration failed', 'Close', {
      duration: 2000,
      panelClass: ['style-success'],
    });
  }
  ngOnInit() {
    this.createForm();
  }

  // onFileChange(event) {
  //   const reader = new FileReader();

  //   if (event.target.files && event.target.files.length) {
  //     const [file] = event.target.files;
  //     reader.readAsDataURL(file);

  //     reader.onload = () => {
  //       this.registerForm.patchValue({
  //         profileimage: reader.result
  //      });

  //       // need to run CD since file load runs outside of zone
  //       this.cd.markForCheck();
  //     };
  //   }
  // }

  onFileChange(event, field) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      // just checking if it is an image, ignore if you want
      if (!file.type.startsWith('profile')) {
        this.addContactForm.get(field).setErrors({
          required: true
        });
        this.cd.markForCheck();
      } else {
        // unlike most tutorials, i am using the actual Blob/file object instead of the data-url
        this.addContactForm.patchValue({
          [field]: file
        });
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      }
    }
  }
  onSubmit() {
    this.addContactForm.patchValue({
      userId: JSON.parse(localStorage.getItem('currentUser')).email
    });

    // const formData = new FormData();
    // Object.entries(this.addContactForm.value).forEach(
    //     ([key, value]: any[]) => {
    //       formData.set(key, value);
    //     });

      // Add service call here

    if (this.addContactForm.valid) {
      console.log('Called');
      this.addcontactservice.addContact(this.addContactForm.value)
      .subscribe((data) => {
        if (data.success) {
          this.openSnackBarSuccess();
          this.resetForm(this.addContactForm);
          this.router.navigate(['/dashboard/contact']);
        } else {
          this.openSnackBarFail();
          this.resetForm(this.addContactForm);
        }
      });
    }
  }

}
