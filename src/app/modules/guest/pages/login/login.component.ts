import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { FirebaseService } from '@services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private $fb: FirebaseService,
    public router: Router,
    public $auth: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initial();
  }
  
  public isShowTerms = false
  public auth: FormGroup;

  public signUp() {
    this.router.navigate(['/guest']);
  }

  private initial() {
    this.auth = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  public login() {
    this.$auth.loginByEmail(this.auth.getRawValue());
  }

}
