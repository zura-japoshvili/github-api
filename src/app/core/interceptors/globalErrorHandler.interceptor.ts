import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';  // Optional for showing snackbars for errors

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private snackBar: MatSnackBar) {}

  handleError(error: any): void {
    let errorMessage = 'An unexpected error occurred';

    // Customize error message based on the type of error
    if (error instanceof HttpErrorResponse) {
      // Handle HTTP errors
      if (error.status === 401) {
        errorMessage = 'Unauthorized access - Please login again.';
      } else if (error.status === 500) {
        errorMessage = 'Server error - Please try again later.';
      } else {
        errorMessage = `HTTP Error: ${error.message}`;
      }
    } else if (error instanceof Error) {
      // Handle general JS errors
      errorMessage = `An unexpected error occurred: ${error.message}`;
    }

    // Show snackbar with error message
    this.snackBar.open(errorMessage, 'Close', {
      duration: 3000, // Show for 3 seconds
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });

    console.error('Global error handler:', error);
  }
}
