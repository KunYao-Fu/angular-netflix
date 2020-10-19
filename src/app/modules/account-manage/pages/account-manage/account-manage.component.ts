import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';
import { IAccount } from '@utilities/interface';

@Component({
  selector: 'app-account-manage',
  templateUrl: './account-manage.component.html',
  styleUrls: ['./account-manage.component.scss']
})
export class AccountManageComponent implements OnInit {

  constructor(
    public router: Router,
    public $user: UserService,
  ) { }

  public isEdit = false;

  ngOnInit(): void {
  }

  public manageAccount(account: IAccount) {
    this.router.navigate(['account-manage/edit', { id: account.id }]);
  }

}