import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth/auth.guard';
import { ErrorComponent } from './layout/pages/error/error.component';


const routes: Routes = [{
  path: '',
  canActivate: [AuthGuard],
  canActivateChild: [AuthGuard],
  children: [
    {
      path: 'guest',
      loadChildren: () => import('./modules/guest/guest.module').then(m => m.GuestModule)
    }
  ]
},
{path: '404', component: ErrorComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
