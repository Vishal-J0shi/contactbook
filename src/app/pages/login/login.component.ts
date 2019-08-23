import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LoginService } from '@/core/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private snackBar: MatSnackBar, private loginService: LoginService) { }

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
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // service call here
      this.loginService.login(this.loginForm.value).subscribe(
        (data) => {
          if (data.success) {
            this.router.navigate(['/dashboard']);
          } else {
            this.openSnackBar();
          }

        });
    }
  }
}
