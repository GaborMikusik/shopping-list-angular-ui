import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionsMenuComponent } from './actions-menu.component';
import { ApiModule, ShoppingList, ShoppingListControllerService } from 'src/app/api';
import { ErrorService } from 'src/app/errors/error.service';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MaterialExampleModule } from 'src/app/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('ActionsMenuComponent', () => {
    let component: ActionsMenuComponent;
    let fixture: ComponentFixture<ActionsMenuComponent>;
    let mockErrorService: Partial<ErrorService>;
    let testShoppingList = {
        createdAt: new Date('2023-08-02T10:41:11.000Z'),
        updatedAt: new Date('2023-08-02T10:41:11.000Z'),
        id: 1,
        name: 'Mock Shopping List',
        description: 'Mock description',
        paid: false,
        items: []
    }

    beforeEach(async () => {
        const fakeShoppingListControllerService: jasmine.SpyObj<ShoppingListControllerService> = jasmine.createSpyObj('ShoppingListControllerService', {
            updateShoppingList: of(testShoppingList),
            deleteShoppingList: of(testShoppingList)
        });

        mockErrorService = {
            handleErrors: () => { /* Mock implementation */ }
        };

        await TestBed.configureTestingModule({
            declarations: [ActionsMenuComponent],
            imports: [
                BrowserModule,
                AppRoutingModule,
                FlexLayoutModule,
                FormsModule,
                ReactiveFormsModule,
                ApiModule,
                HttpClientModule,
                MaterialExampleModule,
                BrowserAnimationsModule
            ],
            providers: [
                { provide: ShoppingListControllerService, useValue: fakeShoppingListControllerService },
                { provide: ErrorService, useValue: mockErrorService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ActionsMenuComponent);
        component = fixture.componentInstance;
        component.list = { id: 2, paid: false } as ShoppingList;
        fixture.detectChanges();
        fixture.debugElement.query(By.css('button[mat-icon-button]')).nativeElement.click();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should emit markListAsPaidEmitter when "Done" button is clicked', () => {
        spyOn(component.markListAsPaidEmitter, 'emit');

        const menuItems = fixture.debugElement.queryAll(By.css('button[mat-menu-item]'));

        const doneButton = menuItems.find((item) => item.nativeElement.textContent.includes('Done'));
        expect(doneButton).toBeTruthy();

        doneButton!.triggerEventHandler('click', null);

        fixture.detectChanges();

        expect(component.markListAsPaidEmitter.emit).toHaveBeenCalledWith(component.list);
    });

    it('should emit deleteListEmitter when "Delete" button is clicked', () => {
        spyOn(component.deleteListEmitter, 'emit');

        const menuItems = fixture.debugElement.queryAll(By.css('button[mat-menu-item]'));

        const deleteButton = menuItems.find((item) => item.nativeElement.textContent.includes('Delete'));
        expect(deleteButton).toBeTruthy();

        deleteButton!.triggerEventHandler('click', null);

        fixture.detectChanges();

        expect(component.deleteListEmitter.emit).toHaveBeenCalledWith(component.list);
    });

    it('should call "updateShoppingList" method when "Save" button is clicked', () => {
        const menuItems = fixture.debugElement.queryAll(By.css('button[mat-menu-item]'));
        const saveButton = menuItems.find((item) => item.nativeElement.textContent.includes('Save'));
        expect(saveButton).toBeTruthy();

        saveButton!.triggerEventHandler('click', null);

        fixture.detectChanges();

        expect(component.list).toEqual(testShoppingList);
    });

    // it('should call "errorService.handleErrors" method when "updateShoppingList" throws an error', fakeAsync(() => {
    //     
    // }));
});
