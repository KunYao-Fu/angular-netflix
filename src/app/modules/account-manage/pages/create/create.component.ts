import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(
    public router: Router,
    public $user: UserService,
  ) { }

  ngOnInit(): void {
  }

  public UserName

  public submit() {
    this.$user.createAccount(this.UserName);
    this.router.navigate(['account-manage']);
  }

  public cancel() {
    this.router.navigate(['account-manage'])
  }
}
