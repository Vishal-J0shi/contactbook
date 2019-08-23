import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ChangepwService } from '@/core/services/changepw/changepw.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {

  passwordForm: FormGroup;

  // Password Match Validator
  private passwordMatcher(control: FormControl): { [s: string]: boolean } {
    if (
      this.passwordForm &&
      (control.value !== this.passwordForm.controls.password.value)
    ) {
      return { passwordNotMatch: true };
    }
    return null;
  }

  constructor(private formBuilder: FormBuilder, private router: Router,
              private snackBar: MatSnackBar, private changepwservice: ChangepwService) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.passwordForm = this.formBuilder.group({
      email: [''],
      password: ['', [Validators.required]],
      oldpassword: ['', [Validators.required] ],
      confirmpassword: ['', [Validators.required, this.passwordMatcher.bind(this)] ]
    });
  }
  openSnackBarSuccess() {
    this.snackBar.open('Password changed', 'Close', {
      duration: 2000,
      panelClass: ['style-success'],
    });
  }
  openSnackBarFailure() {
    this.snackBar.open('Password cannot be updated at the moment', 'Close', {
      duration: 2000,
      panelClass: ['style-success'],
    });
  }

  openSnackBarPasswordError() {
    this.snackBar.open('Old Password does not match. Password cannot be updated', 'Close', {
      duration: 3000,
      panelClass: ['style-success'],
    });
  }
  get confirmpassword() { return this.passwordForm.get('confirmpassword'); }

  onSubmit() {
    this.passwordForm.patchValue({
      email: JSON.parse(localStorage.getItem('currentUser')).email
    });
    if (this.passwordForm.valid) {
      // service call here
      this.changepwservice.changepassword(this.passwordForm.value)
      .subscribe( (data) => {
        if (data.success) {
          this.openSnackBarSuccess();
        }
        if (data.code === 0) {
          this.openSnackBarPasswordError();
        }
        if (data.code === 1) {
          this.openSnackBarFailure();
        }
      } );
    }
  }
}
