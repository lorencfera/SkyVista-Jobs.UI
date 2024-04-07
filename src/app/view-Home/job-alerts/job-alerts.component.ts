import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UserProxy } from 'src/app/service/proxy/aonntherForproxyOkayUSER.proxy';
import { UserNgrxService } from 'src/app/service/state-/ngrx-regualry';

@Component({
  selector: 'app-job-alerts',
  templateUrl: './job-alerts.component.html',
  styleUrls: ['./job-alerts.component.scss']
})
export class JobAlertsComponent implements OnInit {
  userData: any = {};
  currentRoute: any = '';
  regUser: any = {}

  constructor(
    private userNgRxS: UserNgrxService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userProxyS: UserProxy,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.getRegisteredUser();
      this.getUserProfile(params.userId);
    });
    this.currentRoute = this.router.url;
    this.router.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd) {
        this.currentRoute = val.urlAfterRedirects;
      }
    });
  }

  getRegisteredUser() {
    this.userNgRxS.getUserData().subscribe((response: any) => {
      this.regUser = response;
    });
  }

  getUserProfile(userId: string) {
    this.userProxyS.getUserById(userId).subscribe((response: any) => {
      const { password, verificationToken, ...user } = response;
      this.userData = user;
    });
  }

}
