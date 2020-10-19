import { Injectable } from '@angular/core';
import { IUser, IAccount } from '@utilities/interface';
import { ReplaySubject, Subject } from 'rxjs';
import { Account, User } from '@utilities/models/user.model';
import { FirebaseService } from './firebase.service';
import { take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private $fb: FirebaseService,
    private router: Router
  ) { }

  private user: ReplaySubject<User> = new ReplaySubject(1);
  public user$ = this.user.asObservable();

  public createUser(uid: string, data: any, isNewUser = false) {
    this.$fb.document('accounts', uid).read$().subscribe(
      accounts => {
        const USER = new User(data, uid, accounts.data().accounts, isNewUser);
        this.user.next(USER);
      }
    )
  }

  public updateUser(uid: string) {
    this.$fb.document('users', uid).read$().subscribe(
      user => this.createUser(uid, user.data())
    )
  }

  public createAccount(name: string) {
    this.user$.pipe(take(1)).subscribe(
      user => {
        let maxId = 1
        user.accounts.forEach(account => {
          if (account.id > maxId) {
            maxId = account.id
          }
        })
        const ACCOUNT = new Account(maxId + 1, name);
        const ACCOUNTS = { ...{}, ...{ accounts: user.accounts } };
        ACCOUNTS.accounts.push({ ...{}, ...ACCOUNT });
        ACCOUNTS.accounts = ACCOUNTS.accounts.map(account => ({
          id: account.id,
          lan: account.lan,
          name: account.name
        }));
        this.$fb.document('accounts', user.uid).update(ACCOUNTS);
      }
    )
  }

  public updateAccount(newAccount: IAccount, redirect: string) {
    this.user$.pipe(
      take(1),
    ).subscribe(
      user => {
        const NEW_ACCOUNTS = user.accounts.map(account => {
          if (account.id === newAccount.id) {
            return newAccount
          }
          return account
        })
        this.$fb.document('accounts', user.uid).update({ accounts: NEW_ACCOUNTS }).then(
          _ => this.router.navigate([redirect])
        )
      }
    )
  }

  public deleteAccount(id: number, redirect: string) {
    this.user$.pipe(
      take(1),
    ).subscribe(
      user => {
        const NEW_ACCOUNTS = user.accounts.filter(account => account.id !== id);
        this.$fb.document('accounts', user.uid).update({ accounts: NEW_ACCOUNTS }).then(
          _ => {
            this.updateUser(user.uid);
            this.router.navigate([redirect])
          }
        )
      }
    )
  }
}
