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
  @Output() saveList$: EventEmitter<ShoppingList> = new EventEmitter<ShoppingList>();
  @Output() markListAsPaid$: EventEmitter<ShoppingList> = new EventEmitter<ShoppingList>();
  @Output() deleteList$: EventEmitter<ShoppingList> = new EventEmitter<ShoppingList>();


  constructor(private service: ShoppingListControllerService) { }

  saveList(list: ShoppingList) {
    this.service.updateShoppingList(list).subscribe(data => {
      list = data;
    });
  }

  markListAsPaid(list: ShoppingList) {
    list.paid = true;
    list.items = list.items!.filter(_item => _item.purchased)
    this.service.updateShoppingList(list).subscribe(() => {
      this.onMarkListAsPaid()//this.lists = this.lists.filter(_list => _list !== list);
    })
  }

  deleteList(list: ShoppingList) {
    this.service.deleteShoppingList(list.id!).subscribe(() => {
      this.onDeleteList()//this.lists = this.lists.filter(_list => _list !== list);
    })
  }

  onSaveList(): void {
    this.saveList$.emit(this.list);
  }

  onMarkListAsPaid(): void {
    this.markListAsPaid$.emit(this.list);
  }

  onDeleteList(): void {
    this.deleteList$.emit(this.list);
  }
}
