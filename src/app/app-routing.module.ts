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
    },
    {
      path: 'account-manage',
      loadChildren: () => import('./modules/account-manage/account-manage.module').then(m => m.AccountManageModule)
    },
    {
      path: 'dashboard',
      loadChildren:() => import('./modules/dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule)
    }
  ]
},
{ path: '404', component: ErrorComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
