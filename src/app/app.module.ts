import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'

import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialExampleModule } from './material.module';
import { ApiModule } from './api';
import { HttpClientModule } from '@angular/common/http';
import { AddListComponent } from './main/newlist/add-list/add-list.component';
import { ItemInputComponent } from './main/item-input/item-input.component';
import { ShoppingListItemsComponent } from './main/shopping-list-items/shopping-list-items.component';
import { ActionsMenuComponent } from './main/actions-menu/actions-menu.component';
import { ShoppingListCardContentComponent } from './main/shopping-list-card-content/shopping-list-card-content.component';
import { ShoppingListCardComponent } from './main/shopping-list-card/shopping-list-card.component';
import { ShoppingListGridComponent } from './main/shopping-list-grid/shopping-list-grid.component';
import { ErrorService } from './errors/error.service';
import { ListManagementComponent } from './list-management.component';

@NgModule({
  declarations: [
    ListManagementComponent,
    AddListComponent,
    ItemInputComponent,
    ShoppingListGridComponent,
    ActionsMenuComponent,
    ShoppingListCardComponent,
    ShoppingListCardContentComponent,
    ShoppingListItemsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    ApiModule,
    HttpClientModule
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [ErrorService],
  bootstrap: [ListManagementComponent]
})
export class AppModule { }