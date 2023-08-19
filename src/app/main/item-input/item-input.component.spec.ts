import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemInputComponent } from './item-input.component';
import { FormsModule } from '@angular/forms';
import { MaterialExampleModule } from 'src/app/material.module';
import { ShoppingListControllerService } from 'src/app/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ItemInputComponent', () => {
    let mockShoppingListControllerService: jasmine.SpyObj<ShoppingListControllerService>;
    let component: ItemInputComponent;
    let fixture: ComponentFixture<ItemInputComponent>;

    beforeEach(async () => {
        const shoppingListControllerServiceSpy = jasmine.createSpyObj('ShoppingListControllerService', ['addItem']);
        await TestBed.configureTestingModule({
            declarations: [ItemInputComponent],
            imports: [MaterialExampleModule, FormsModule, BrowserAnimationsModule],
            providers: [
                { provide: ShoppingListControllerService, useValue: shoppingListControllerServiceSpy },
            ]
        })
            .compileComponents();

        mockShoppingListControllerService = TestBed.inject(ShoppingListControllerService) as jasmine.SpyObj<ShoppingListControllerService>;
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemInputComponent);
        component = fixture.componentInstance;
        component.list = { id: 1, name: "test_list", items: [], paid: true };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not display form field when list is paid', () => {
        fixture.detectChanges();

        const formField = fixture.nativeElement.querySelector('.example-form-field');

        expect(formField).toBeFalsy();
    });

    it('should display form field and hide add button when list is not paid and input is empty', () => {
        component.list = { id: 1, name: "test_list", items: [], paid: false };
        component.itemName = ''
        fixture.detectChanges();

        const formField = fixture.nativeElement.querySelector('.example-form-field');
        const addButton = fixture.nativeElement.querySelector('button[aria-label="Clear"]');

        expect(formField).toBeTruthy();
        expect(addButton).toBeFalsy();
    });

    it('should display form field and add button when list is not paid and input is not empty', () => {
        component.list = { id: 1, name: "test_list", items: [], paid: false };
        component.itemName = 'test'
        fixture.detectChanges();

        const formField = fixture.nativeElement.querySelector('.example-form-field');
        const addButton = fixture.nativeElement.querySelector('button[aria-label="Clear"]');

        expect(formField).toBeTruthy();
        expect(addButton).toBeTruthy();
    });
});
