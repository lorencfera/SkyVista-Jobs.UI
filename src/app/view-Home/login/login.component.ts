import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginLogoutEmitterService } from 'src/app/service/emitters/login.emit';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import { AuthProxyService } from 'src/app/service/proxy/auth.proxy.service';
import { UserNgrxService } from 'src/app/service/state-/ngrx-regualry';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  constructor(
    private authProxyS: AuthProxyService,
    private router: Router,
    private localStorageServiceComp: LocalStorageService,
    private loginoutEmitter: LoginLogoutEmitterService,
    private userNgRxS: UserNgrxService
  ) {}

  ngOnInit(): void {}

  userForm: FormGroup = new FormGroup({
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string | null>(null, Validators.required),
  })

  onFormSubmit() {
    this.authProxyS.loginUser(this.userForm.value).subscribe(
      (response: any) => {
        this.localStorageServiceComp.setExp(
          'jwt',
          response.access_token,
          86400000
        );
        this.authProxyS.whoami().subscribe((user: any) => {
          const { verificationToken, ...restUser } = user;
          this.userNgRxS.addUserData(restUser);
          this.loginoutEmitter.loginlogoutEmitter.emit(true);
          this.router.navigate(['']);
        });
      },
      (error) => {
        console.error('User dsfdfdfdf', error)
      }
    );
  }
}
