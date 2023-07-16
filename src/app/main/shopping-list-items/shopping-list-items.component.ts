import { Component, Input } from '@angular/core';
import { Item, ShoppingList, ShoppingListControllerService } from 'src/app/api';

@Component({
  selector: 'app-shopping-list-items',
  templateUrl: './shopping-list-items.component.html',
  styleUrls: ['./shopping-list-items.component.css']
})
export class ShoppingListItemsComponent {
  @Input() list: ShoppingList;

  constructor(private service: ShoppingListControllerService) { }

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
}
