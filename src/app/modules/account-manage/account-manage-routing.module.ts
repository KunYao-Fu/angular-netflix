import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountManageComponent } from './pages/account-manage/account-manage.component';
import { CreateComponent } from './pages/create/create.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';


const routes: Routes = [
  { path: '', component: AccountManageComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit', component: UserManagementComponent },
  { path: 'edit/:id', component: UserManagementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountManageRoutingModule { }
