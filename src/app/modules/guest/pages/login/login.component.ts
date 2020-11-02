import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.initial();
  }

  public isShowTerms = false
  public auth: FormGroup;

  public getErrorMsg(field: string) {
    const FIELD = this.auth.get(field);
    return FIELD.hasError('required') ? '必填欄位' :
      FIELD.hasError('invalid') ? FIELD.getError('invalid').message : null;
  }

  public signUp() {
    this.router.navigate(['/guest']);
  }

  private initial() {
    this.auth = this.formBuilder.group({
      email: [this.route.snapshot.paramMap.get('email'), [Validators.required, this.validateEmail]],
      password: ['', [Validators.required]]
    })
  }

  public login() {
    this.$auth.loginByEmail(this.auth.getRawValue());
  }

  private validateEmail(control: AbstractControl): ValidationErrors {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(control.value) ? null : { invalid: { message: 'test' } };
  }

}
