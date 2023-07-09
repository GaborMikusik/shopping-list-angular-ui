import { Component } from '@angular/core';
import { AccountService } from '../../service/account.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthControllerService } from 'src/app/api';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/errors/error-dialog/error-dialog.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;

  form: FormGroup;
  emailfield = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  constructor(private router: Router, public accountService: AccountService, private authContorollerService: AuthControllerService, private fb: FormBuilder, private dialog: MatDialog) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  signUp() {
    const user = {
      name: this.form.value.name,
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password
    }
    console.log(user)
    this.authContorollerService.registerUser(user).subscribe(data => {
      if (data.success === true) {
        this.router.navigate(['/account/signin']);
      }
    }, (error: any) => {
      this.dialog.open(ErrorDialogComponent, {
        data: {
          status: error.error.status,
          message: error.error.message,
          errors: error.error.errors
        },
      });
    })
  }

  cancel() {
    this.router.navigate(['/account/signin']);
  }

  getErrorMessage() {
    if (this.emailfield.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailfield.hasError('email') ? 'Not a valid email' : '';
  }

}
