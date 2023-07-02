import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../service/account.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  Roles: any = ['Admin', 'Author', 'Reader'];
  usernameOrEmail: string;
  password: string;

  constructor(private router: Router, private accountService: AccountService) {

  }

  signIn() {
    this.accountService.signin(this.usernameOrEmail, this.password).subscribe(data => {
      console.log(data)
      this.accountService.toggleButtons({
        name: 'testName',
        username: 'testUsername',
        email: 'test@test.com',
        password: 'password'
      })
      this.router.navigate(['/']);
    })
  }

  signUp() {
    this.router.navigate(['/account/signup']);
  }
}

