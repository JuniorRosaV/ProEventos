import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export class ValidadorField {

  static mustMatch(
    controlName: string,
    matchingControlName: string
  ): (formGroup: AbstractControl) => ValidationErrors | null {

    return (formGroup: AbstractControl): ValidationErrors | null => {
      const group = formGroup as FormGroup;
      const control = group.controls[controlName];
      const matchingControl = group.controls[matchingControlName];

      if (!control || !matchingControl) {
        return null;
      }

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return null;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
        return { mustMatch: true };
      } else {
        matchingControl.setErrors(null);
        return null;
      }
    };
  }
}
