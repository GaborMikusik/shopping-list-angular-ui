import { Component } from '@angular/core';
import { ShoppingList, ShoppingListControllerService } from '../api';
import { NavigationButtonService } from '../service/navigation-button.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../errors/error-dialog/error-dialog.component';
import { AddListComponent } from './newlist/add-list/add-list.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  dialogRef: MatDialogRef<AddListComponent>;
  itemName: string;
  items: ShoppingList[] = [];

  constructor(private service: ShoppingListControllerService, private navigationService: NavigationButtonService, private dialog: MatDialog) {
    this.service.getShoppingLists().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.items.push(data[i])
        console.log(data[i]);
      }
    })
  }

  ngOnInit() {
    this.navigationService.buttonClick$.subscribe((buttonName) => {
      this.handleButtonClick(buttonName);
    });
  }

  addNewItem(list: ShoppingList) {
    console.log(list.id)
    this.service.addItem({ name: this.itemName, quantity: 1 }, list.id!).subscribe((newList: ShoppingList) => {
      list.items!.push(newList.items![newList.items!.length - 1])
      this.itemName = '';
    },
      (error: any) => {
        this.dialog.open(ErrorDialogComponent, {
          data: {
            status: error.error.status,
            message: error.error.message,
            errors: error.error.errors
          },
        });
      })
  }

  handleButtonClick(buttonName: string) {
    if (buttonName === 'actualLists') {
      console.log('actualLists');
      this.service.getActualShoppingLists().subscribe(data => {
        this.items = []
        for (let i = 0; i < data.length; i++) {
          this.items.push(data[i])
          console.log(data[i]);
        }
      })
      return
    }

    if (buttonName === 'history') {
      this.service.getAlreadyPaidShoppingLists().subscribe(data => {
        this.items = []
        for (let i = 0; i < data.length; i++) {
          this.items.push(data[i])
          console.log(data[i]);
        }
      })
      return
    }

    if (buttonName === 'newList') {
      console.log('Button clicked: newList')
      this.dialogRef = this.dialog.open(AddListComponent, {});
      this.dialogRef.afterClosed().subscribe((result: ShoppingList) => {
        this.items.push(result)
        // Handle the API response from the dialog
        console.log('Dialog result:', result);
        // Perform further actions based on the result
      });
      return
    }
  }
}
