import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { RegisterService } from '@/core/services/register/register.service';
import { Router } from '@angular/router';
import { UserValidatorsService } from '@/core/services/validators/user-validators/user-validators.service';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  addUserForm: FormGroup;

  // Password Match Validator
  private passwordMatcher(control: FormControl): { [s: string]: boolean } {
    if (
      this.addUserForm &&
      (control.value !== this.addUserForm.controls.password.value)
    ) {
      return { passwordNotMatch: true };
    }
    return null;
  }

  constructor(private formBuilder: FormBuilder, private cd: ChangeDetectorRef,
              private snackBar: MatSnackBar, private registrationService: RegisterService,
              private router: Router, private validator: UserValidatorsService) { }

  createForm() {
    this.addUserForm = this.formBuilder.group({
      profile: [null],
      email: ['', [Validators.required, Validators.email], [this.validator.userEmailValidator()] ],
      password: ['', [Validators.required]],
      confirmpassword: ['', [Validators.required, this.passwordMatcher.bind(this)]],
      name: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern( '[0-9]{0,10}')]]
    });
    }
    get email() {return this.addUserForm.get('email'); }

  resetForm(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null) ;
    });
  }

  openSnackBarSuccess() {
    this.snackBar.open('User Added successful', 'Close', {
      duration: 4000,
      panelClass: ['style-success'],
    });
  }
  openSnackBarFail() {
    this.snackBar.open('User cannot be added at the moment', 'Close', {
      duration: 2000,
      panelClass: ['style-success'],
    });
  }
  ngOnInit() {
    this.createForm();
  }
  get confirmpassword() { return this.addUserForm.get('confirmpassword'); }

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
        this.addUserForm.get(field).setErrors({
          required: true
        });
        this.cd.markForCheck();
      } else {
        // unlike most tutorials, i am using the actual Blob/file object instead of the data-url
        this.addUserForm.patchValue({
          [field]: file
        });
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      }
    }
  }
  onSubmit() {
    const formData = new FormData();
    Object.entries(this.addUserForm.value).forEach(
        ([key, value]: any[]) => {
          formData.set(key, value);
        });

      // Add service call here
    // this.registrationService.register(this.registerForm)
    //   .subscribe((data) => {
    //     if (data.success) {
    //       this.openSnackBarSuccess();
    //     } else {
    //       this.openSnackBarFail();
    //       // this.resetForm(this.registerForm);
    //     }
    //   });
    if (this.addUserForm.valid) {
      console.log('Called');

      // const formData = new FormData();
      // Object.entries(this.registerForm.value).forEach(
      //   ([key, value]: any[]) => {
      //     formData.set(key, value);
      //   });

      // // Add service call here
      // this.registrationService.register(formData)
      // .subscribe((data) => {
      //   if (data.success) {
      //     this.openSnackBarSuccess();
      //   } else {
      //     this.openSnackBarFail();
      //     this.resetForm(this.registerForm);
      //   }
      // });

      // Add service call here
      this.registrationService.register(this.addUserForm.value)
    .subscribe((data) => {
      if (data.success) {
        this.openSnackBarSuccess();
        this.resetForm(this.addUserForm);
      } else {
        this.openSnackBarFail();
        // this.resetForm(this.registerForm);
      }
    });
    }
  }
}
