import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestGuard } from '@guest/guest.guard';
import { IndexComponent } from '@guest/pages/index/index.component';



const routes: Routes = [{
  path: '',
  canActivate: [GuestGuard],
  children: [
    {path: '', component: IndexComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
