import { Component } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ShoppingList, ShoppingListControllerService } from 'src/app/api';
import { NavigationButtonService } from 'src/app/service/navigation-button.service';
import { AddListComponent } from '../newlist/add-list/add-list.component';

@Component({
  selector: 'app-shopping-list-grid',
  templateUrl: './shopping-list-grid.component.html',
  styleUrls: ['./shopping-list-grid.component.css']
})
export class ShoppingListGridComponent {
  dialogRef: MatDialogRef<AddListComponent>;
  itemName: string;
  lists: ShoppingList[] = [];

  constructor(private service: ShoppingListControllerService, private navigationService: NavigationButtonService, private dialog: MatDialog) {
    this.service.getShoppingLists().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].paid! == true)
          continue

        this.lists.push(data[i])
      }
    })
  }

  ngOnInit() {
    this.navigationService.buttonClick$.subscribe((buttonName) => {
      this.handleButtonClick(buttonName);
    });
  }

  handleButtonClick(buttonName: string) {
    if (buttonName === 'actualLists') {
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
        }
      })
      return
    }

    if (buttonName === 'newList') {
      this.dialogRef = this.dialog.open(AddListComponent, {});
      this.dialogRef.afterClosed().subscribe((result: ShoppingList) => {
        this.lists.push(result)
      });
      return
    }
  }

  handleMarkListAsPaid(list: ShoppingList): void {
    this.lists = this.lists.filter(_list => _list !== list);
  }

  handleDeleteList(list: ShoppingList): void {
    this.lists = this.lists.filter(_list => _list !== list);
  }
}
