import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestGuard } from '@guest/guest.guard';
import { IndexComponent } from '@guest/pages/index/index.component';
import { LoginComponent } from '@guest/pages/login/login.component';




const routes: Routes = [{
  path: '',
  canActivate: [GuestGuard],
  children: [
    { path: '', redirectTo: 'index' },
    { path: 'index', component: IndexComponent },
    { path: 'login', component: LoginComponent },
    { path: 'login/:email', component: LoginComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
