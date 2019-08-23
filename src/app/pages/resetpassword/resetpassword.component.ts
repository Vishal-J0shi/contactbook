import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { ForgotpasswordService } from '@/core/services/forgotpassword/forgotpassword.service';
import { ResetpasswordService } from '@/core/services/resetpassword/resetpassword.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})

export class ResetpasswordComponent implements OnInit {

  resetpasswordForm: FormGroup;
  submitted = false;
  formvisible = false;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private snackBar: MatSnackBar, private resetService: ResetpasswordService,
              private route: ActivatedRoute) { }

  resetForm(form: FormGroup) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key).setErrors(null) ;
    });
  }
  // Password Match Validator
  private passwordMatcher(control: FormControl): { [s: string]: boolean } {
    if (
      this.resetpasswordForm &&
      (control.value !== this.resetpasswordForm.controls.password.value)
    ) {
      return { passwordNotMatch: true };
    }
    return null;
  }

  openSnackBar() {
    this.snackBar.open('Request cannot be processed right now.', 'Close', {
      duration: 2000,
      panelClass: ['style-success'],
    });
  }

  createForm() {
    this.resetpasswordForm = this.formBuilder.group({
      hash: [],
      password: [null, [Validators.required]],
      confirmpassword: [null, [Validators.required, this.passwordMatcher.bind(this)]]
    });
  }

  get confirmpassword() {return this.resetpasswordForm.get('confirmpassowrd'); }

  ngOnInit() {
    this.createForm();
    const id = this.route.snapshot.paramMap.get('id');
    this.resetService.verifyToken({ id })
    .subscribe((data) => {
      if (data.success) {
        this.formvisible = true;
        this.resetpasswordForm.patchValue({
          hash: id
        });
      }
    });
  }

  onSubmit() {
    if (this.resetpasswordForm.valid) {
      // service call here
      this.resetService.resetpassword(this.resetpasswordForm.value).subscribe(
        (data) => {
          if (data.success) {
            this.submitted = true;
            this.formvisible = false;
          } else {
            this.openSnackBar();
          }

        });
    }
  }
}
