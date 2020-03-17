import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import * as M from 'materialize-css/dist/js/materialize';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    {
      provide: 'M',
      useValue: M
    }
  ],
  exports: [
    CommonModule
  ]
})
export class SharedModule {}
