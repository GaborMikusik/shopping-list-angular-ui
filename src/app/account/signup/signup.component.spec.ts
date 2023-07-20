import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { Router } from '@angular/router';
import { ApiResponse, AuthControllerService } from 'src/app/api';
import { ErrorService } from 'src/app/errors/error.service';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { MaterialExampleModule } from 'src/app/material.module';
import { of, throwError } from 'rxjs';
import { HttpEvent } from '@angular/common/http';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAuthControllerService: jasmine.SpyObj<AuthControllerService>;
  let mockErrorService: jasmine.SpyObj<ErrorService>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const authControllerServiceSpy = jasmine.createSpyObj('AuthControllerService', ['registerUser']);
    const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['handleErrors']);

    TestBed.configureTestingModule({
      declarations: [SignupComponent, SignUpFormComponent],
      imports: [MaterialExampleModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthControllerService, useValue: authControllerServiceSpy },
        { provide: ErrorService, useValue: errorServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockAuthControllerService = TestBed.inject(AuthControllerService) as jasmine.SpyObj<AuthControllerService>;
    mockErrorService = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should sign up user and navigate to signin', () => {
    const formData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword',
      confirmPassword: 'testpassword'
    };

    const mockSignUpData: ApiResponse = {
      success: true,
      message: 'message'
    };

    const mockSignUpDataResponse = of(mockSignUpData as HttpEvent<ApiResponse>);
    mockAuthControllerService.registerUser.and.returnValue(mockSignUpDataResponse);

    component.signUp(formData);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/account/signin']);
  });

  it('should do nothing if registration was not success', () => {
    const formData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword',
      confirmPassword: 'testpassword'
    };

    const mockSignUpData: ApiResponse = {
      success: false,
      message: 'message'
    };

    const mockSignUpDataResponse = of(mockSignUpData as HttpEvent<ApiResponse>);
    mockAuthControllerService.registerUser.and.returnValue(mockSignUpDataResponse);

    component.signUp(formData);

    expect(mockRouter.navigate).toHaveBeenCalledTimes(0);
  })

  it('should handle sign-up error', () => {
    const formData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword',
      confirmPassword: 'testpassword'
    };

    const errorMessage = 'Invalid credentials';
    const errorResponse = { message: errorMessage };
    const errorObservable = throwError(errorResponse);

    mockAuthControllerService.registerUser.and.returnValue(errorObservable);
    mockErrorService.handleErrors.and.callFake((errorArg: any) => {
      expect(errorArg.message).toBe(errorMessage);
    });

    component.signUp(formData);

    expect(mockErrorService.handleErrors).toHaveBeenCalled();
  });

  it('should navigate to signin page on cancel', () => {
    component.cancel();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/account/signin']);
});

});

