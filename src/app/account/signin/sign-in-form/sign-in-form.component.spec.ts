import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInFormComponent } from './sign-in-form.component';
import { By } from '@angular/platform-browser';
import { MaterialExampleModule } from 'src/app/material.module';

describe('SignInFormComponent', () => {
  let component: SignInFormComponent;
  let fixture: ComponentFixture<SignInFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MaterialExampleModule,
        BrowserAnimationsModule,
      ],
      declarations: [SignInFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit signIn event on form submission', () => {
    spyOn(component.signIn, 'emit');
    const formData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword',
    };
    component.form.setValue(formData);
    const formElement = fixture.debugElement.query(By.css('form'));
    formElement.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();
    expect(component.signIn.emit).toHaveBeenCalledWith(formData);
  });

  it('should emit signUp event on SignUp button click', () => {
    spyOn(component.signUp, 'emit');
    const signUpButton = fixture.debugElement.query(By.css('button[mat-fab][color="primary"]'));
    signUpButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.signUp.emit).toHaveBeenCalled();
    });
  });

  it('should disable SignIn button when form is invalid', () => {
    const signInButton = fixture.debugElement.query(By.css('button[mat-fab][color="primary"]')).nativeElement;
    expect(signInButton.disabled).toBeTruthy();

    component.form.controls['username'].setValue('testuser');
    component.form.controls['email'].setValue('test@example.com');
    component.form.controls['password'].setValue('testpassword');
    fixture.detectChanges();
    expect(signInButton.disabled).toBeFalsy();
  });

  it('should show error message for invalid email', async () => {
    const errorMessage = 'Not a valid email';
    fixture.whenStable().then(() => {
      const emailInput = fixture.debugElement.query(By.css('input[matInput][type="email"]')).nativeElement;
      emailInput.value = 'invalid-email';
      emailInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const matError = fixture.debugElement.query(By.css('.mat-error'));
      expect(matError.nativeElement.textContent.trim()).toBe(errorMessage);
    });
  });
});



