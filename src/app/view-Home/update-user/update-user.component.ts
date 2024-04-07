import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginLogoutEmitterService } from 'src/app/service/emitters/login.emit';
import { AuthProxyService } from 'src/app/service/proxy/auth.proxy.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit{
  userData: any = {};
  currentEmail!: string;
  constructor(
    private authProxyS: AuthProxyService,
    private dialog: MatDialog,
    private router: Router,
    private loginoutEmitter: LoginLogoutEmitterService
  ) {}


  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.authProxyS.whoami().subscribe((response: any) => {
      this.userData = response
      this.currentEmail = response.email
      this.userData.firstname = response.firstname
      this.userData.lastname = response.lastname
      this.userData.uploadresume = response.uploadresume
      this.userData.conntactmethod = response.conntactmethod
      this.userData.contacttime = response.contacttime
      this.userData.home = response.home
      this.userData.work = response.work
      this.userData.mobile = response.mobile
      this.userData.employmenttype = response.employmenttype
      this.userData.salarexpection = response.salarexpection
      this.userData.whencanyoustart = response.whencanyoustart
      this.userData.eduaction = response.eduaction
      this.userData.employment = response.employment
      this.userData.educationdegree = response.educationdegree
      this.userData.specialization = response.specialization
      this.userData.gradeGpa = response.gradeGpa
      this.userData.compleatedate = response.compleatedate
      this.userData.Contactname = response.Contactname
      this.userData.country = response.country
      this.userData.city = response.city
      this.userData.zipcode = response.zipcode
      this.userData.password = response.password
    })
  }

  onSubmitNi() { 
    this.authProxyS.updateUser(this.userData).subscribe((response: any) => {
      if(response) { 
        if(response.email !== this.currentEmail) {
          console.log('go check the database to Verified the email right!')
        this.router.navigate(['login'])
        localStorage.removeItem('jwt')
        this.loginoutEmitter.loginlogoutEmitter.emit(false)
        this.dialog.closeAll()
        }else { 
          console.log('you made it the account has been updated apperciate it!')
          this.dialog.closeAll()
        }
      }
    })
  }
}
