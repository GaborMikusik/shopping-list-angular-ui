import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css']
})
export class SignInFormComponent {
  @Output() signIn = new EventEmitter<any>();
  @Output() signUp = new EventEmitter<void>();

  form: FormGroup;
  hide = true;
  emailField = new FormControl('', [Validators.required, Validators.email]);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  getErrorMessage() {
    if (this.emailField.hasError('required')) {
      return 'You must enter a value';
    }
    return this.emailField.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    this.signIn.emit(this.form.value);
  }

  onSignUp() {
    this.signUp.emit();
  }
}
