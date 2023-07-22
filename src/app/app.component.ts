import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './model/user';
import { NavigationButtonService } from './service/navigation-button.service';
import { ErrorService } from './errors/error.service';
import { AccountService } from './service/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user?: User | null;

  constructor(
    private router: Router,
    public accountService: AccountService,
    private navigationService: NavigationButtonService,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.accountService.getShowListManagement$.subscribe(
      (data: User | null) => {
        this.user = data;
        this.handleNavigation();
      },
      (error: any) => {
        this.errorService.handleErrors(error);
      }
    );
  }

  private handleNavigation() {
    if (this.accountService.userValue) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/account/signin']);
    }
  }

  onButtonClick(buttonName: string) {
    this.navigationService.emitButtonClick(buttonName);
  }

  logout() {
    this.accountService.logout();
  }
}
