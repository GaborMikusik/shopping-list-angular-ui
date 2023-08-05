import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent {
  @Output() signUp = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  getErrorMessage() {
    if (this.form.get('email')!.hasError('required')) {
      return 'You must enter a value';
    }
    return this.form.get('email')!.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    this.signUp.emit(this.form.value);
  }

  onCancel() {
    this.cancel.emit();
  }
}
