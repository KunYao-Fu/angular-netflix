import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { FirebaseService } from '@services/firebase.service';
import { ValidatorService } from '@services/validator.service';

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
    private $validator: ValidatorService
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
      password: ['', [Validators.required, this.validatePassword]]
    })
  }

  public login() {
    this.$auth.loginByEmail(this.auth.getRawValue());
  }

  private validateEmail(emailField: AbstractControl): ValidationErrors {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/.test(emailField.value) ? null : { invalid: { message: '請填寫正確Email格式' } };
  }

  private validatePassword(passwordField: AbstractControl): ValidationErrors {
    return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/.test(passwordField.value) ? null : { invalid: { message: "請填寫正確密碼格式" } };
  }


}
