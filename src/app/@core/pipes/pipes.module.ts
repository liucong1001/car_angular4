import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyPipe } from './property.pipe';

const PIPES = [
  PropertyPipe,
]

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [...PIPES],
  exports: [PIPES],
})
export class PipesModule { }
