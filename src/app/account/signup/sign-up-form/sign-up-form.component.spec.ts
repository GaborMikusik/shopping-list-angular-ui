import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpFormComponent } from './sign-up-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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

  // it('should emit the cancel event on Cancel button click', () => {
  //   spyOn(component.cancel, 'emit');
  //   const signUpButton = fixture.debugElement.query(By.css('button[mat-fab][color="primary"]'));
  //   signUpButton.triggerEventHandler('click', null);
  //   fixture.detectChanges();

  //   fixture.whenStable().then(() => {
  //     expect(component.cancel.emit).toHaveBeenCalled();
  //   });
  // });

  it('should disable SignUp button when form is invalid', () => {
    const signUpButton = fixture.debugElement.query(By.css('button[mat-fab][color="primary"]')).nativeElement;
    expect(signUpButton.disabled).toBeTruthy();

    component.form.controls['name'].setValue('testname');
    component.form.controls['username'].setValue('testuser');
    component.form.controls['email'].setValue('test@example.com');
    component.form.controls['password'].setValue('testpassword');
    component.form.controls['confirmPassword'].setValue('testpassword');
    fixture.detectChanges();
    expect(signUpButton.disabled).toBeFalsy();
  });

  // it('should show error message for invalid email', async () => {
  //   const errorMessage = 'Not a valid email';
  //   fixture.whenStable().then(() => {
  //     const emailInput = fixture.debugElement.query(By.css('input[matInput][type="email"]')).nativeElement;
  //     emailInput.value = 'invalid-email';
  //     emailInput.dispatchEvent(new Event('input'));
  //     fixture.detectChanges();

  //     const matError = fixture.debugElement.query(By.css('.mat-error'));
  //     expect(matError.nativeElement.textContent.trim()).toBe(errorMessage);
  //   });
  // });
});
