import { Directive } from '@angular/core';
import { Validator, FormControl, NG_VALIDATORS, ValidationErrors} from '@angular/forms';

@Directive({
  selector: `[${UrlDirective.NAME}][formControlName],[${UrlDirective.NAME}][formControl],[${UrlDirective.NAME}][ngModel]`,
  providers: [{ provide: NG_VALIDATORS, useExisting: UrlDirective, multi: true }]
})
export class UrlDirective implements Validator {
  protected static readonly NAME: string = 'appUrl';
  private static readonly IMAGE_URI_REG: RegExp = new RegExp('^(https?|ftp)://.*(jpg|jpeg|png|gif|bmp)', 'i');

  constructor() { }

  validate(control: FormControl): ValidationErrors {
    const value = control.value;
    return value && !value.match(UrlDirective.IMAGE_URI_REG) ? { [UrlDirective.NAME] : true } : null;
  }

}
