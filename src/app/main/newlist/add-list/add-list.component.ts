import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ShoppingList, ShoppingListControllerService } from 'src/app/api';
import { ErrorService } from 'src/app/errors/error.service';

export interface NewListData {
  name: string
  description: string
}

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent {
  name: string
  description: string
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: NewListData,
    private service: ShoppingListControllerService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddListComponent>,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['']
    });
  }

  addNewList() {
    this.service.createShoppingList({ name: this.form.value.name, description: this.form.value.description }).subscribe(
      (data: ShoppingList) => {
        this.dialogRef.close(data)
      },
      (error: any) => {
        this.errorService.handleErrors(error);
      })
  }
}
