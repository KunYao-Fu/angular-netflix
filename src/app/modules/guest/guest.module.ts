import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestRoutingModule } from './guest-routing.module';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';


@NgModule({
  declarations: [IndexComponent, LoginComponent],
  imports: [
    CommonModule,
    GuestRoutingModule
  ]
})
export class GuestModule { }
