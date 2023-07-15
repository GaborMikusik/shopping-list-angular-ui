import { Component } from '@angular/core';
import { Item, ShoppingList, ShoppingListControllerService } from '../api';
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
  lists: ShoppingList[] = [];

  constructor(private service: ShoppingListControllerService, private navigationService: NavigationButtonService, private dialog: MatDialog) {
    this.service.getShoppingLists().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].paid! == true)
          continue

        this.lists.push(data[i])
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
        this.lists = []
        for (let i = 0; i < data.length; i++) {
          this.lists.push(data[i])
          console.log(data[i]);
        }
      })
      return
    }

    if (buttonName === 'history') {
      this.service.getAlreadyPaidShoppingLists().subscribe(data => {
        this.lists = []
        for (let i = 0; i < data.length; i++) {
          this.lists.push(data[i])
          console.log(data[i]);
        }
      })
      return
    }

    if (buttonName === 'newList') {
      console.log('Button clicked: newList')
      this.dialogRef = this.dialog.open(AddListComponent, {});
      this.dialogRef.afterClosed().subscribe((result: ShoppingList) => {
        this.lists.push(result)
      });
      return
    }
  }

  saveList(list: ShoppingList) {
    this.service.updateShoppingList(list).subscribe(data => {
      list = data;
    });
  }

  incrementQuantity(item: any) {
    item.quantity++;
  }

  decrementQuantity(item: any) {
    if (item.quantity > 0) {
      item.quantity--;
    }
  }

  deleteItem(list: ShoppingList, item: Item) {
    this.service.deleteItem(item.id!).subscribe(() => {
      list.items = list.items!.filter(_item => _item !== item);
    })
  }

  deleteList(list: ShoppingList) {
    this.service.deleteShoppingList(list.id!).subscribe(() => {
      this.lists = this.lists.filter(_list => _list !== list);
    })
  }

  markListAsPaid(list: ShoppingList) {
    list.paid = true;
    this.service.updateShoppingList(list).subscribe(() => {
      this.lists = this.lists.filter(_list => _list !== list);
    })
  }
}
