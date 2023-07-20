import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SigninComponent } from './signin.component';
import { AccountService } from '../../service/account.service';
import { AuthControllerService, JwtAuthenticationResponse } from 'src/app/api';
import { ErrorService } from 'src/app/errors/error.service';
import { of, throwError } from 'rxjs';
import { HttpEvent } from '@angular/common/http';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { MaterialExampleModule } from 'src/app/material.module';

describe('SigninComponent', () => {
    let component: SigninComponent;
    let fixture: ComponentFixture<SigninComponent>;
    let mockRouter: jasmine.SpyObj<Router>;
    let mockAccountService: jasmine.SpyObj<AccountService>;
    let mockAuthControllerService: jasmine.SpyObj<AuthControllerService>;
    let mockErrorService: jasmine.SpyObj<ErrorService>;

    beforeEach(() => {
        const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
        const accountServiceSpy = jasmine.createSpyObj('AccountService', ['showManagement']);
        const authControllerServiceSpy = jasmine.createSpyObj('AuthControllerService', ['authenticateUser']);
        const errorServiceSpy = jasmine.createSpyObj('ErrorService', ['handleErrors']);

        TestBed.configureTestingModule({
            declarations: [SigninComponent, SignInFormComponent],
            imports: [MaterialExampleModule],
            providers: [
                { provide: Router, useValue: routerSpy },
                { provide: AccountService, useValue: accountServiceSpy },
                { provide: AuthControllerService, useValue: authControllerServiceSpy },
                { provide: ErrorService, useValue: errorServiceSpy }
            ]
        });

        fixture = TestBed.createComponent(SigninComponent);
        component = fixture.componentInstance;
        mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
        mockAccountService = TestBed.inject(AccountService) as jasmine.SpyObj<AccountService>;
        mockAuthControllerService = TestBed.inject(AuthControllerService) as jasmine.SpyObj<AuthControllerService>;
        mockErrorService = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should sign in user and navigate to root', () => {
        const formData = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'testpassword'
        };

        const mockTokenData: JwtAuthenticationResponse = {
            tokenType: 'Bearer',
            accessToken: 'sample-access-token'
        };

        const mockTokenDataResponse = of(mockTokenData as HttpEvent<JwtAuthenticationResponse>);
        mockAuthControllerService.authenticateUser.and.returnValue(mockTokenDataResponse);

        component.signIn(formData);

        const expectedUser = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            token: `${mockTokenData.tokenType} ${mockTokenData.accessToken}`
        };

        expect(localStorage.getItem('user')).toBe(JSON.stringify(expectedUser));
        expect(mockAccountService.showManagement).toHaveBeenCalledWith(expectedUser);
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should handle sign-in error', () => {
        const formData = {
            username: 'testuser',
            email: 'test@example.com',
            password: 'testpassword'
        };

        const errorMessage = 'Invalid credentials';
        const errorResponse = { message: errorMessage };
        const errorObservable = throwError(errorResponse);

        mockAuthControllerService.authenticateUser.and.returnValue(errorObservable);
        mockErrorService.handleErrors.and.callFake((errorArg: any) => {
            expect(errorArg.message).toBe(errorMessage);
        });

        component.signIn(formData);

        expect(mockErrorService.handleErrors).toHaveBeenCalled();
    });

    it('should navigate to signup page on sign-up', () => {
        component.signUp();

        expect(mockRouter.navigate).toHaveBeenCalledWith(['/account/signup']);
    });
});
