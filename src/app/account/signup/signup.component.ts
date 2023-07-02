import { Component } from '@angular/core';
import { AccountService } from '../../service/account.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';

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

  Roles: any = ['Admin', 'Author', 'Reader'];

  registerForm: FormGroup;
  fieldRequired: string = "This field is required"

  ngOnInit() {
    this.createForm();
  }

  constructor(private fb: FormBuilder, private router: Router, private accountService: AccountService) { }

  signUp() {
    const user = {
      name: 'testName',
      username: 'testUsername',
      email: 'test@test.com',
      password: 'password'
    };
    this.accountService.signup(user).subscribe(data => {
      console.log(data)
      if (data.success === true) {
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/account/signin']);
      }
    })
  }

  cancel() {
    this.router.navigate(['/account/signin']);
  }

  createForm() {
    let emailRegex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.registerForm = this.fb.group({
      'username': [null, Validators.required],
      'email': [null, [Validators.required, Validators.pattern(emailRegex)]],
      'password': [null, [Validators.required, this.checkPassword]],
    });
  }

  getErrorMessage(field: string) {
    const formControl = this.registerForm.get(field);
    if (formControl!.hasError('required')) {
      return 'This field is required';
    } else if (formControl!.hasError('pattern')) {
      return 'Not a valid email address';
    } else if (formControl!.hasError('requirements')) {
      return 'Password needs to be at least six characters, one uppercase letter, and one number';
    } else {
      return '';
    }
  }

  checkPassword(control: FormControl) {
    const enteredPassword = control.value;
    const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const username = this.registerForm.value.username;

    //this.auth!.registerUser(email, password, username);

    this.registerForm.reset();
  }
}
