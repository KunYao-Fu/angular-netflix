import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from './modules/overlay/overlay.module';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { LanguageDropdownComponent } from './components/language-dropdown/language-dropdown.component';



@NgModule({
  declarations: [DropdownComponent,LanguageDropdownComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    OverlayModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
    LanguageDropdownComponent,
    DropdownComponent
  ]
})
export class SharedModule { }
