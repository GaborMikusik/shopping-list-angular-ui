import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../service/account.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthControllerService } from 'src/app/api';
import { ErrorDialogComponent } from 'src/app/errors/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  username?: string;
  email?: string
  password: string;
  form: FormGroup;
  hide = true
  emailfield = new FormControl('', [Validators.required, Validators.email]);

  constructor(private router: Router, private accountService: AccountService, private authControllerService: AuthControllerService, private fb: FormBuilder, private dialog: MatDialog) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signIn() {
    const usernameOrEmail = this.form.value.username === "" ? this.form.value.email : this.form.value.username;
    this.authControllerService.authenticateUser({
      usernameOrEmail: usernameOrEmail,
      password: this.form.value.password
    }).subscribe(data => {
      const user = {
        username: this.form.value.username,
        email: this.form.value.email,
        password: this.form.value.password,
        token: data.tokenType + ' ' + data.accessToken
      }
      localStorage.setItem('user', JSON.stringify(user));
      this.accountService.showManagement({
        username: this.form.value.username,
        email: this.form.value.email,
        password: this.form.value.password
      })
      this.router.navigate(['/']);
    },
      (error: any) => {
        this.dialog.open(ErrorDialogComponent, {
          data: {
            status: error.error.status,
            message: error.error.message,
            errors: ['Username, email address or password is incorrect']
          },
        });
      })
  }

  signUp() {
    this.router.navigate(['/account/signup']);
  }

  isUsernameValid(): boolean {
    return this.form.get('username')!.valid;
  }

  isEmailValid(): boolean {
    return this.form.get('email')!.valid
  }

  isPasswordValid(): boolean {
    return this.form.get('password')!.valid
  }

  getErrorMessage() {
    if (this.emailfield.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailfield.hasError('email') ? 'Not a valid email' : '';
  }

}

