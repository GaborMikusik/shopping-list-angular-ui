import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private showShoppingListManagementSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user')!));
  public showShoppingListManagement$: Observable<User | null> = this.showShoppingListManagementSubject.asObservable();

  constructor(private router: Router) { }

  public get userValue() {
    return this.showShoppingListManagementSubject.value;
  }

  showManagement(user: User) {
    this.showShoppingListManagementSubject.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.showShoppingListManagementSubject.next(null);
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
