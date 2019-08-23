import { Component, OnInit, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { RegisterService } from '@/core/services/register/register.service';
import { Router } from '@angular/router';
import { UserValidatorsService } from '@/core/services/validators/user-validators/user-validators.service';
import { UpdateprofileService } from '@/core/services/updateprofile/updateprofile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editProfileForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private cd: ChangeDetectorRef,
              private snackBar: MatSnackBar, private updateprofileservice: UpdateprofileService,
              private appRef: ApplicationRef) { }

  createForm() {
    this.editProfileForm = this.formBuilder.group({
      id: [null],
      profile: [null],
      email: ['', [], [] ],
      name: [null, [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern( '[0-9]{0,10}')]]
    });
    }
    get email() {return this.editProfileForm.get('email'); }

  resetForm(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null) ;
    });
  }

  openSnackBarSuccess() {
    this.snackBar.open('Profile updated successfully', 'Close', {
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
    this.editProfileForm.patchValue({
      id: JSON.parse(localStorage.getItem('currentUser')).user._id,
      email: JSON.parse(localStorage.getItem('currentUser')).user.email,
      name: JSON.parse(localStorage.getItem('currentUser')).user.name,
      phone: JSON.parse(localStorage.getItem('currentUser')).user.phone,
    });
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
        this.editProfileForm.get(field).setErrors({
          required: true
        });
        this.cd.markForCheck();
      } else {
        // unlike most tutorials, i am using the actual Blob/file object instead of the data-url
        this.editProfileForm.patchValue({
          [field]: file
        });
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      }
    }
  }
  onSubmit() {
    const formData = new FormData();
    Object.entries(this.editProfileForm.value).forEach(
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
    if (this.editProfileForm.valid) {
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
      this.updateprofileservice.updateProfile(this.editProfileForm.value)
    .subscribe((data) => {
      if (data.success) {
        this.openSnackBarSuccess();
        this.appRef.tick();

      } else {
        this.openSnackBarFail();
        // this.resetForm(this.registerForm);
      }
    });
    }
  }
}
