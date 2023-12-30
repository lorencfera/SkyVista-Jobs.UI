import { Component } from '@angular/core';
import { LoginLogoutEmitterService } from './service/emitters/login.emit';
import { UserNgrxService } from './service/state-/ngrx-regualry';
import { Router } from '@angular/router';
import { LoadingService } from './interceptors/loadinng.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'social-network-front';
  afterLoginDisplay: boolean = localStorage.getItem('jwt') ? true : false;
  userData: any = {};
  searchValue: any;
  loader: boolean = false;

  constructor(
    private loginoutEmitter: LoginLogoutEmitterService,
    private userNgRxS: UserNgrxService,
    private router: Router,
    private loadingService: LoadingService
  ) {}
  ngOnInit(): void {
    this.setLoading();
    this.getUsersssssssssProlife()
    this.loginoutEmitter.loginlogoutEmitter.subscribe((response: boolean) => {
      this.afterLoginDisplay = response;
    });
  }

  getUsersssssssssProlife() { 
    this.userNgRxS.getUserData().subscribe((response: any) => {
      this.userData = response;
    });
  }

  setLoading() {
    this.loadingService.loadingEmit.subscribe((response: any) => {
      this.loader = response;
    });
  }

logOut() {
  localStorage.removeItem('jwt');
  this.userNgRxS.deleteUserData();
  this.loginoutEmitter.loginlogoutEmitter.emit(false);
  this.router.navigate(['login']);
}
}
