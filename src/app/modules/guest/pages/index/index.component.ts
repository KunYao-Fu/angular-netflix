import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { FirebaseService } from '@services/firebase.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(
    private router: Router,
    private $fb: FirebaseService,
    private $auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  public dropdownStatus: string = "close"

  public login() {
    this.router.navigate(['guest/login']);
  }

  public openDropdown(status: string) {
    if (this.dropdownStatus === status) {
      this.dropdownStatus = "close"
    }
    else {
      this.dropdownStatus = status
    }
  }
}
