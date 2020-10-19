import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountManageRoutingModule } from './account-manage-routing.module';
import { UserComponent } from './components/user/user.component';
import { AccountManageComponent } from './pages/account-manage/account-manage.component';
import { CreateComponent } from './pages/create/create.component';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [UserComponent, AccountManageComponent, CreateComponent, UserManagementComponent],
  imports: [
    CommonModule,
    AccountManageRoutingModule,
    FormsModule,
    SharedModule
  ],
  exports: [
  ]
})
export class AccountManageModule { }
