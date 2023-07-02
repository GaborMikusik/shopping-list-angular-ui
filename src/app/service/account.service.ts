import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private showButtonsSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user')!));
  public showButtons$: Observable<User | null> = this.showButtonsSubject.asObservable();

  constructor(private router: Router) { }

  public get userValue() {
    return this.showButtonsSubject.value;
  }


  toggleButtons(user: User) {
    this.showButtonsSubject.next(user);
  }

  signup(user: User) {
    return new Observable<SignupResponse>(observer => {
      observer.next({
        success: true,
        message: 'User successfuly created'
      })
      observer.complete()
    })
  }

  signin(usernameOrEmail: string, password: string) {
    return new Observable<JwtAuthenticationResponse>(observer => {
      observer.next({
        accessToken: 'jwtToken',
        tokenType: 'Bearer'
      })
      observer.complete()
    })
  }

  logout() {
    localStorage.removeItem('user');
    this.showButtonsSubject.next(null);
    this.router.navigate(['/account/signin']);
  }

}

class SignupResponse {
  public success: boolean
  public message: string
}

class JwtAuthenticationResponse {
  public accessToken: string
  public tokenType: string
}
