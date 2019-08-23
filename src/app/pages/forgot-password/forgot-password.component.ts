import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LoginService } from '@/core/services/login/login.service';
import { ForgotpasswordService } from '@/core/services/forgotpassword/forgotpassword.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private snackBar: MatSnackBar, private forgotservice: ForgotpasswordService) { }

  resetForm(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null) ;
    });
  }

  openSnackBar() {
    this.snackBar.open('Invalid email or Password', 'Close', {
      duration: 2000,
      panelClass: ['style-success'],
    });
  }

  createForm() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['']
    });
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      // service call here
      this.forgotservice.forgot(this.forgotPasswordForm.value).subscribe(
        (data) => {
          if (data.success) {
            // change flag and show check email
            this.submitted = true;
            console.log(data.url);
            this.router.navigate(['/login']);
          } else {
            this.openSnackBar();
          }

        });
    }
  }
}
