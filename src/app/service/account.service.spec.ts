import { TestBed } from '@angular/core/testing';
import { AccountService } from './account.service';
import { User } from '../model/user';
import { Router } from '@angular/router';

describe('AccountService', () => {
  let service: AccountService;
  let routerMock: Router;
  let localStorageMock: Storage;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    localStorageMock = jasmine.createSpyObj('Storage', ['removeItem']);

    TestBed.configureTestingModule({
      providers: [
        AccountService,
        { provide: Router, useValue: routerMock },
        { provide: Storage, useValue: localStorageMock }
      ]
    });

    service = TestBed.inject(AccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show management when called with a user', () => {
    const user: User = {
      username: 'username',
      email: 'email',
      password: 'password',
      token: 'token'
    };

    service.showManagement(user);

    expect(service.userValue).toEqual(user);
  });

  it('should logout and navigate to signin page', () => {
    const localStorageSpy = spyOn(localStorage, 'removeItem');

    service.logout();

    expect(localStorageSpy).toHaveBeenCalledWith('user');
    expect(service.userValue).toEqual(null);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/account/signin']);
  });
});
