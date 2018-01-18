import {Directive, ElementRef, HostBinding, HostListener, Input} from '@angular/core';
import {FormControl} from '@angular/forms';

@Directive({
  selector: '[ngxErrorClass]',
})
export class ErrorClassDirective {
  constructor(private element: ElementRef) {
  }
  @HostBinding('class.form-control-danger') invalid = false;
  @HostListener('focusout') onFocusOut() {
    this.invalid = this.isInvalid();
  }

  isInvalid(): boolean {
    return this._control && (this._control.touched || this._control.dirty) && this._control.invalid;
  }

  @Input('ngxErrorClass')
  set control(control: FormControl) {
    this._control = control;
    control.statusChanges.subscribe(event => {
      this.invalid = this.isInvalid();
    });
  }
  _control: FormControl;
}
