import { Component, Input } from '@angular/core';
import { ShoppingList } from 'src/app/api';

@Component({
  selector: 'app-shopping-list-card',
  templateUrl: './shopping-list-card.component.html',
  styleUrls: ['./shopping-list-card.component.css']
})
export class ShoppingListCardComponent {
  @Input() list: ShoppingList;
}
