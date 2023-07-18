import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../service/account.service';
import { AuthControllerService } from 'src/app/api';
import { ErrorService } from 'src/app/errors/error.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(
    private router: Router,
    private accountService: AccountService,
    private authControllerService: AuthControllerService,
    private errorService: ErrorService
  ) { }

  signIn(formData: any) {
    const usernameOrEmail = formData.username === '' ? formData.email : formData.username;
    this.authControllerService.authenticateUser({
      usernameOrEmail: usernameOrEmail,
      password: formData.password,
    }).subscribe(
      (data) => {
        const user = {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          token: data.tokenType + ' ' + data.accessToken
        };
        localStorage.setItem('user', JSON.stringify(user));
        this.accountService.showManagement(user);
        this.router.navigate(['/']);
      },
      (error: any) => {
        this.errorService.handleErrors(error);
      }
    );
  }

  signUp() {
    this.router.navigate(['/account/signup']);
  }
}
