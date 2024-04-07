import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginLogoutEmitterService } from 'src/app/service/emitters/login.emit';
import { AuthProxyService } from 'src/app/service/proxy/auth.proxy.service';

@Component({
  selector: 'app-updatenrtwo-user',
  template: `
  <h1>Edit/View Preferences</h1>
<hr>
<p>Select up to 3 Preferred job categories</p> <br><br>

<form (ngSubmit)="onSubmitNi()" mat-dialog-content>
  <div class="allSillz">
    <h2> Preferences</h2>
    <hr>
    <nav>
        <ul>
        <li><span>Employer Name</span> *<input type="text" 
             ></li><br>
          <li><span>Job Title</span> *<input type="text" 
                name="Contactname" [(ngModel)]="userData.Contactname"></li><br>
                <li><span>Reason for Leaving</span> *<input style="height: 84px;" type="text" 
                name="zipcode" [(ngModel)]="userData.zipcode"></li><br>

                <li><span>Country</span> *<input type="text" 
                name="country" [(ngModel)]="userData.country"></li><br>

                <li><span>City</span> *<input type="text" 
                name="city" [(ngModel)]="userData.city"></li><br>
        </ul>
      </nav>
  </div>
  <div class="auth-form-actions">
    <button type="submit" mat-raised-button color="primary">Save</button>
  </div>
</form>

<mat-dialog-actions align="end">
  <button mat-button mat-dialog-close>Cancel</button>
</mat-dialog-actions>

  
  `,
  styles: [`li{
    list-style: none;
}
.form-select{ 
    width: 11%;
}
`]
})
export class AddPositionAndEduationUpdated implements OnInit {

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
      if (response) { 
        if (response.email !== this.currentEmail) {
          console.log('Go check the database to verify the email!');
          this.router.navigate(['login']);
          localStorage.removeItem('jwt');
          this.loginoutEmitter.loginlogoutEmitter.emit(false);
          this.dialog.closeAll();
        } else { 
          console.log('The account has been updated. Appreciate it!');
          this.dialog.closeAll();
        }
      }
    });
  }
}