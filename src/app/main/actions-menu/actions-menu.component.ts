import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShoppingList, ShoppingListControllerService } from 'src/app/api';

@Component({
  selector: 'app-actions-menu',
  templateUrl: './actions-menu.component.html',
  styleUrls: ['./actions-menu.component.css']
})
export class ActionsMenuComponent {
  //@Input() lists: ShoppingList[];
  @Input() list: ShoppingList;
  @Output() markListAsPaidEmitter: EventEmitter<ShoppingList> = new EventEmitter<ShoppingList>();
  @Output() deleteListEmitter: EventEmitter<ShoppingList> = new EventEmitter<ShoppingList>();


  constructor(private service: ShoppingListControllerService) { }

  saveList(list: ShoppingList) {
    this.service.updateShoppingList(list).subscribe(data => {
      list = data;
    });
  }

  markListAsPaid(list: ShoppingList) {
    list.paid = true;
    this.service.updateShoppingList(list).subscribe(() => {
      this.markListAsPaidEmitter.emit(this.list);
    })
  }

  deleteList(list: ShoppingList) {
    this.service.deleteShoppingList(list.id!).subscribe(() => {
      this.deleteListEmitter.emit(this.list);
    })
  }
}
