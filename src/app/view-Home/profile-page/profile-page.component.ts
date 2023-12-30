import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LoginLogoutEmitterService } from 'src/app/service/emitters/login.emit';
import { UserProxy } from 'src/app/service/proxy/aonntherForproxyOkayUSER.proxy';
import { AuthProxyService } from 'src/app/service/proxy/auth.proxy.service';
import { UserNgrxService } from 'src/app/service/state-/ngrx-regualry';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { UpdateUserComponentnrtwo } from '../forUpdates/updatenrtwo';
import { AddPositionAndEduationUpdated } from '../forUpdates/addpostioneduaction.update';
import { addEduacation } from '../forUpdates/addEducation';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit{
  userData: any = {};
  currentRoute: any = '';
  regUser: any = {}
  tab: string = 'addpostiion'

  ngSwitchAddPosition() { 
    this.tab = 'addpostiion'
  }
  ngSwitchAddEducation() { 
    this.tab = 'addEduacation'
  }
  constructor(
    private userNgRxS: UserNgrxService,
    private router: Router,
    private loginoutEmitter: LoginLogoutEmitterService,
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
  getUserProfile(userId: string) {
    this.userProxyS.getUserById(userId).subscribe((response: any) => {
      const { password, verificationToken, ...user } = response;
      this.userData = user;
    });
  }

  getRegisteredUser() {
    this.userNgRxS.getUserData().subscribe((response: any) => {
      this.regUser = response;
    });
  }


  openUpdateUserFormBtnClick() {
    this.dialog.open(UpdateUserComponent,{
    height: "calc(100% - 30px)",
    width: "calc(100% - 30px)",
    maxWidth: "100%",
    maxHeight: "100%"
  })
}

openUpdateUsernrTwoFormBtnClick() {
  this.dialog.open(UpdateUserComponentnrtwo,{
  height: "calc(100% - 30px)",
  width: "calc(100% - 30px)",
  maxWidth: "100%",
  maxHeight: "100%"
})
}

openUpdatePositionandEduactionTwoFormBtnClick() {
  this.dialog.open(AddPositionAndEduationUpdated,{
  height: "calc(100% - 30px)",
  width: "calc(100% - 30px)",
  maxWidth: "100%",
  maxHeight: "100%"
})
}

AddEduacationFormBtnClickk() {
  this.dialog.open(addEduacation,{
  height: "calc(100% - 30px)",
  width: "calc(100% - 30px)",
  maxWidth: "100%",
  maxHeight: "100%"
})
}

}
