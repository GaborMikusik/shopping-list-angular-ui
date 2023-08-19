import { Component, Input } from '@angular/core';
import { ShoppingList, ShoppingListControllerService } from 'src/app/api';
import { ErrorService } from 'src/app/errors/error.service';

@Component({
  selector: 'app-item-input',
  templateUrl: './item-input.component.html',
  styleUrls: ['./item-input.component.css']
})
export class ItemInputComponent {
  @Input() list: ShoppingList;
  itemName: string;

  constructor(private service: ShoppingListControllerService, private errorService: ErrorService) { }

  addNewItem(list: ShoppingList) {
    this.service.addItem({ name: this.itemName, quantity: 1 }, list.id!).subscribe(
      (newList: ShoppingList) => {
        list.items!.push(newList.items![newList.items!.length - 1])
        this.itemName = '';
      },
      (error) => {
        this.errorService.handleErrors(error);
      }
    )
  }
}
