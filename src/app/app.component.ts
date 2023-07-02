import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from './service/account.service';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-list-app';
  user?: User | null;
  public static staticuser = new BehaviorSubject<boolean>(true);


  name = 'Angular';
  public isCollapsed = true;

  constructor(private router: Router, public accountService: AccountService) {
    //localStorage.removeItem('user');
    this.accountService.showButtons$.subscribe(data => {
      this.user = data;
      if (this.accountService.userValue) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/account/signin']);
      }
    });
  }

  logout() {
    this.accountService.logout()
  }
}
