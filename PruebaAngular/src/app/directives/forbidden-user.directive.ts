import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

export function forbiddenUserValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenUser: { value: control.value } } : null;
  };
}

@Directive({
  selector: '[appForbiddenUser]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ForbiddenValidatorDirective,
      multi: true
    }
  ],
  standalone: true
})
export class ForbiddenValidatorDirective implements Validator { 
  @Input('appForbiddenUser') forbiddenUser: string = 'pertierra';

  validate(control: AbstractControl): ValidationErrors | null {
    return this.forbiddenUser ? forbiddenUserValidator(new RegExp(this.forbiddenUser, 'i'))(control) : null;
  }
}
