import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/errors/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(private dialog: MatDialog) { }

  handleErrors(error: any) {
    this.dialog.open(ErrorDialogComponent, {
      data: {
        status: error.error.status,
        message: error.error.message,
        errors: ['Username, email address, or password is incorrect']
      },
    });
  }
}
