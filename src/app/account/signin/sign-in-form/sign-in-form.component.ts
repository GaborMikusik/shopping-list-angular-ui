import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  getErrorMessage() {
    if (this.form.get('email')!.hasError('required')) {
      return 'You must enter a value';
    }
    return this.form.get('email')!.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    this.signIn.emit(this.form.value);
  }

  onSignUp() {
    this.signUp.emit();
  }
}
