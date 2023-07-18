import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShoppingList } from 'src/app/api';

@Component({
  selector: 'app-shopping-list-card',
  templateUrl: './shopping-list-card.component.html',
  styleUrls: ['./shopping-list-card.component.css']
})
export class ShoppingListCardComponent {
  @Input() list: ShoppingList;
  @Output() saveListEmitter: EventEmitter<ShoppingList> = new EventEmitter<ShoppingList>();
  @Output() markListAsPaidEmitter: EventEmitter<ShoppingList> = new EventEmitter<ShoppingList>();
  @Output() deleteListEmitter: EventEmitter<ShoppingList> = new EventEmitter<ShoppingList>();

  handleMarkListAsPaid(list: ShoppingList): void {
    this.markListAsPaidEmitter.emit(list);
  }

  handleDeleteList(list: ShoppingList): void {
    this.deleteListEmitter.emit(list);
  }
}
