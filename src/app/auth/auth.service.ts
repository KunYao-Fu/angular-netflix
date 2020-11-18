import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from '@models/user.model';
import { FirebaseService } from '@services/firebase.service';
import { UserService } from '@services/user.service';
import * as fb from 'firebase/app';
import { ReplaySubject } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private $fbAuth: AngularFireAuth,
    private $fb: FirebaseService,
    private router: Router,
    private $user: UserService
  ) {
    this.$fbAuth.authState.subscribe(
      auth => {
        if (!!auth) {
          this.initalUser(auth.uid);
        } else {
          this.logout();
        }
      }
    );
  }

  private email: ReplaySubject<string> = new ReplaySubject();
  public email$ = this.email.asObservable().pipe(
    map (_ => this.testEmailStrenth(_))
  )

  public testEmailStrenth(email) {
    let x = 0;
    if (email.length > 8) {
      x = x + 1
    }
    else {
      if (email.includes('*')) {
        x = x + 1
      }
      else (email.split('*')[1].length > 3)
        x = x + 1
    }
    return x
  }

  public changeEmail(email: string) {
    this.email.next(email)
  }

  get isLogin() {
    return sessionStorage.getItem('uid');
  }

  public loginByGoogle() {
    this.$fbAuth.signInWithPopup(new fb.auth.GoogleAuthProvider()).then(
      res => {
        if (res.additionalUserInfo.isNewUser) {
          this.createUser(res.user, true).then(
            _ => this.router.navigate(['account-manage'])
          );
        }
      }
    )
  }

  public loginByEmail({ email, password }) {
    console.log(email, password)
    this.$fbAuth.signInWithEmailAndPassword(email, password).then(
      res => {
        if (res.additionalUserInfo.isNewUser) {
          this.createUser(res.user, true).then(
            _ => this.router.navigate(['account-manage'])
          );
        }
      }
    ).catch(
      error => console.log(error)
    )
  }

  public logout() {
    sessionStorage.clear();
    this.$fbAuth.signOut();
    this.router.navigate(['guest']);
  }

  private createUser(user: fb.UserInfo, isNewUser = false): Promise<void> {
    const USER = new User({
      email: user.email,
      name: user.displayName,
    }, user.uid);
    return this.$fb.document('users', user.uid).create(USER.profile).then(
      _ => this.$fb.document('accounts', user.uid).create({
        accounts: USER.accounts.map(account => ({
          id: account.id,
          lan: account.lan,
          name: account.name
        }), isNewUser)
      })
    )
  }

  private initalUser(uid: string) {
    this.$fb.document('users', uid).read$().subscribe(
      res => {
        this.$user.createUser(uid, res.data());
      }
    )
    sessionStorage.setItem('uid', uid);
    this.router.navigate(['account-manage'])
  }
}
