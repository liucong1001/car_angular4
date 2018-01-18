import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {ErrorMessage} from '../valid-error/valid-error.component';

export class BaseFormControl {
  @Input() label: string;
  @Input() control: FormControl;
  @Input() errors: ErrorMessage[];
}
