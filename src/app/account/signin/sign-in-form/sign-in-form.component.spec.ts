import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignInFormComponent } from './sign-in-form.component';
import { By } from '@angular/platform-browser';
import { MaterialExampleModule } from 'src/app/material.module';
import { MatTabGroup, MatTab } from '@angular/material/tabs';

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

  it('should show error message for invalid email', () => {
    const errorMessage = 'Not a valid email';
    const component: MatTabGroup = fixture.debugElement.query(
      By.css('mat-tab-group'),
    ).componentInstance;
    const tabs: MatTab[] = component._tabs.toArray();

    expect(tabs[0].position).toBe(0);
    expect(tabs[1].position).toBeGreaterThan(0);

    component.selectedIndex = 1;
    fixture.detectChanges();
    expect(tabs[0].position).toBeLessThan(0);
    expect(tabs[1].position).toBe(0);
    console.log(tabs[1])

    const emailInput = fixture.debugElement.query(By.css('[data-testid="email-input"]')).nativeElement;
    emailInput.value = 'invalid-email';
    emailInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const matError = fixture.debugElement.query(By.css('[data-testid="mat-error"]'));
    expect(matError.nativeElement.textContent.trim()).toBe(errorMessage);
  });

  it('should show error message for empty email', () => {
    const errorMessage = 'You must enter a value';

    const emailInput = fixture.debugElement.query(By.css('[data-testid="email-input"]')).nativeElement;
    emailInput.value = '';
    emailInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const matError = fixture.debugElement.query(By.css('[data-testid="mat-error"]'));
    expect(matError.nativeElement.textContent.trim()).toBe(errorMessage);
  });
});



