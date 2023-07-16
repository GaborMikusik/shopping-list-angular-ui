import { Component, Input } from '@angular/core';
import { ShoppingList } from 'src/app/api';

@Component({
  selector: 'app-shopping-list-card-content',
  templateUrl: './shopping-list-card-content.component.html',
  styleUrls: ['./shopping-list-card-content.component.css']
})
export class ShoppingListCardContentComponent {
  @Input() list: ShoppingList;
}
