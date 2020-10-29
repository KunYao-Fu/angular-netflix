import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private $auth: AuthService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initial()
  }

  public dropdownStatus: string = "close"
  public auth: FormGroup;

  public initial() {
    this.auth = this.formBuilder.group({
      email: ['', [Validators.required]]
    })
  }


  public login() {
    this.router.navigate(['guest/login']);
  }

  public signUp() {
    this.router.navigate(['guest/login',this.auth.get('email').value])
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
