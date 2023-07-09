export * from './authController.service';
import { AuthControllerService } from './authController.service';
export * from './shoppingListController.service';
import { ShoppingListControllerService } from './shoppingListController.service';
export const APIS = [AuthControllerService, ShoppingListControllerService];
