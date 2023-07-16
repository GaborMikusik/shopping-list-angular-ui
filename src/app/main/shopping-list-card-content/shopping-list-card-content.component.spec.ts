import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListCardContentComponent } from './shopping-list-card-content.component';

describe('ShoppingListCardContentComponent', () => {
  let component: ShoppingListCardContentComponent;
  let fixture: ComponentFixture<ShoppingListCardContentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoppingListCardContentComponent]
    });
    fixture = TestBed.createComponent(ShoppingListCardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
