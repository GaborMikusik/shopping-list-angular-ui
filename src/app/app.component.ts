import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AccountService } from './service/account.service';
import { User } from './model/user';
import { ThemePalette } from '@angular/material/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { NavigationButtonService } from './service/navigation-button.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  color: ThemePalette = 'accent';
  checked = false;
  disabled = false;

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });


  title = 'shopping-list-app';
  user?: User | null;
  public static staticuser = new BehaviorSubject<boolean>(true);


  name = 'Angular';
  public isCollapsed = true;

  constructor(private router: Router, public accountService: AccountService, private navigationSerivce: NavigationButtonService, private _formBuilder: FormBuilder) {
    this.accountService.showShoppingListManagement$.subscribe(data => {
      this.user = data;
      if (this.accountService.userValue) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['/account/signin']);
      }
    });
  }

  onButtonClick(buttonName: string) {
    this.navigationSerivce.emitButtonClick(buttonName);
  }

  logout() {
    this.accountService.logout()
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }
}
