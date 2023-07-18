import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthControllerService } from 'src/app/api';
import { ErrorService } from 'src/app/errors/error.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(
    private router: Router,
    private authControllerService: AuthControllerService,
    private errorService: ErrorService
  ) { }

  signUp(user: any) {
    this.authControllerService.registerUser(user).subscribe(
      (data) => {
        if (data.success === true) {
          this.router.navigate(['/account/signin']);
        }
      },
      (error: any) => {
        this.errorService.handleErrors(error);
      }
    );
  }

  cancel() {
    this.router.navigate(['/account/signin']);
  }
}

