import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from 'src/app/common/layout/layout.component';
import { AccountRoutingModule } from './account-routing.module';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';
import { MatIconModule } from '@angular/material/icon';
import { MaterialExampleModule } from 'src/app/material.module';
import { ErrorDialogComponent } from 'src/app/errors/error-dialog/error-dialog.component';
import { SignInFormComponent } from '../signin/sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from '../signup/sign-up-form/sign-up-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    FormsModule,
    MaterialExampleModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    FormsModule,
    MatIconModule,
  ],
  declarations: [
    LayoutComponent,
    SigninComponent,
    SignInFormComponent,
    SignupComponent,
    SignUpFormComponent,
    ErrorDialogComponent
  ]
})
export class AccountModule { }
