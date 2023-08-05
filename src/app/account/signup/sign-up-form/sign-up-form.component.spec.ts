import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpFormComponent } from './sign-up-form.component';
import { ReactiveFormsModule, FormsModule, FormControl, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from 'src/app/material.module';
import { By } from '@angular/platform-browser';

describe('SignUpFormComponent', () => {
  let component: SignUpFormComponent;
  let fixture: ComponentFixture<SignUpFormComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MaterialExampleModule,
        BrowserAnimationsModule,
      ],
      declarations: [SignUpFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit signUp event on form submission', () => {
    spyOn(component.signUp, 'emit');
    const formData = {
      name: 'testname',
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword',
      confirmPassword: 'testpassword',
    };

    component.form.setValue(formData);

    const formElement = fixture.debugElement.query(By.css('form'));
    formElement.triggerEventHandler('ngSubmit', null);

    fixture.detectChanges();

    expect(component.signUp.emit).toHaveBeenCalledWith(formData);
  });

  it('should emit the cancel event on Cancel button click', () => {
    spyOn(component.cancel, 'emit');

    const signUpButton = fixture.debugElement.query(By.css('[data-testid="cancel-button"]'));
    signUpButton.triggerEventHandler('click', null);

    fixture.detectChanges();

    expect(component.cancel.emit).toHaveBeenCalled();
  });

  it('should disable SignUp button when form is invalid', () => {
    const signUpButton = fixture.debugElement.query(By.css('[data-testid="signup-button"]')).nativeElement;
    expect(signUpButton.disabled).toBeTruthy();

    component.form.controls['name'].setValue('testname');
    component.form.controls['username'].setValue('testuser');
    component.form.controls['email'].setValue('test@example.com');
    component.form.controls['password'].setValue('testpassword');
    component.form.controls['confirmPassword'].setValue('testpassword');

    fixture.detectChanges();

    expect(signUpButton.disabled).toBeFalsy();
  });

  it('should have an invalid email field for an empty email', () => {
    const emailControl = component.form.get('email')!;
    emailControl.setValue('');
    emailControl.markAsTouched();

    fixture.detectChanges();

    expect(emailControl!.invalid).toBeTrue();
    expect(emailControl!.errors?.hasOwnProperty('required')).toBeTrue();
  });

  it('should have an invalid email field for an invalid email format', () => {
    const emailControl = component.form.get('email')!;
    emailControl.setValue('invalid-email');
    emailControl.markAsTouched();

    fixture.detectChanges();

    expect(emailControl.invalid).toBeTrue();
    expect(emailControl.errors?.hasOwnProperty('email')).toBeTrue();
  });

  it('should display "You must enter a value" error message for an empty email', () => {
    const emailControl = component.form.get('email')!;
    emailControl.setValue('');
    emailControl.markAsTouched();

    fixture.detectChanges();

    const matError = fixture.nativeElement.querySelector('[data-testid="mat-error"]');
    expect(matError.textContent).toContain('You must enter a value');
  });

  it('should display "Not a valid email" error message for an invalid email format', () => {
    const emailControl = component.form.get('email')!;
    emailControl.setValue('invalid-email');
    emailControl.markAsTouched();

    fixture.detectChanges();

    const matError = fixture.nativeElement.querySelector('[data-testid="mat-error"]');
    expect(matError.textContent).toContain('Not a valid email');
  });
});
