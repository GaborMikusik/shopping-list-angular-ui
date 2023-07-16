import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShoppingList, ShoppingListControllerService } from 'src/app/api';
import { ErrorDialogComponent } from 'src/app/errors/error-dialog/error-dialog.component';

@Component({
  selector: 'app-item-input',
  templateUrl: './item-input.component.html',
  styleUrls: ['./item-input.component.css']
})
export class ItemInputComponent {
  @Input() list: ShoppingList;
  itemName: string;

  constructor(private service: ShoppingListControllerService, private dialog: MatDialog) { }

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
}
