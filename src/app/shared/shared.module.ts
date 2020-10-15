import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from './modules/overlay/overlay.module';



@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    OverlayModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    OverlayModule
  ]
})
export class SharedModule { }
