import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '@services/user.service';
import { IAccount } from '@utilities/interface';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  constructor(
    public router: Router,
    public $user: UserService,
    private route: ActivatedRoute
  ) {
  }

  public account: IAccount;

  public Mock = [{
    code: 'zh-hant',
    text: '繁體中文'
  }, {
    code: 'zh-hans',
    text: '簡體中文'
  }, {
    code: 'en',
    text: 'English'
  }]

  ngOnInit(): void {
    this.inital();
  }

  ngOnDestroy() {

  }

  get Languages() {
    return this.Mock.map(mock => mock.text)
  }

  private inital() {
    this.$user.user$.pipe(
      take(1)
    ).subscribe(
      user => {
        this.account = user.accounts.filter(account => account.id === parseInt(this.route.snapshot.paramMap.get('id'), 10))[0]
      }
    )
  }


  public delete() {
    this.$user.deleteAccount(this.account.id, 'account-manage');
  }

  public submit() {
    this.$user.updateAccount(this.account, 'account-manage');
  }

}
