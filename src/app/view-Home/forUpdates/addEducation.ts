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
<p>Provide complete information for all education levels, entering your highest degree completed firs</p> <br><br>
<h1>Education History</h1>
<form (ngSubmit)="onSubmitNi()" mat-dialog-content>
  <div class="allSillz">
    <h2> Preferences</h2>
    <div class="InputXZ">
      <nav>
        <ul>
          <li>
            <span>Education Degree</span> *
            <select class="form-select" name="employmenttype" id="employmenttype" [(ngModel)]="userData.educationdegree">
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Certificate">Certificate</option>
              <option value="Doctorate Degree">Doctorate Degree</option>
              <option value="Other Degree Diploma?">Other Degree Diploma?</option>
              <option value="Other">Other</option>
            </select>
          </li> <br>
          <li>
            <span>Specialization/Major</span> *
            <select class="form-select" id="preferredEmploymentType" [(ngModel)]="userData.specialization">
              <option value="Nursing">Nursing?</option>
              <option value="Administration">Administration</option>
              <option value="Advertising">Advertising</option>
              <option value="Anesthesia">Anesthesia?</option>
              <option value="Arts">Arts</option>
              <option value="Applied Science">Applied Science</option>
              <option value="Biotechnology">Biotechnology?</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Coding">Coding</option>

            </select>
          </li> <br>
          <li>
            <span>Completion Date</span> *<input type="text" name="compleatedate" [(ngModel)]="userData.compleatedate" placeholder="12/07/20**" >
           </li><p><b>Current Student: Enter Your expected graduation year</b></p><br>
          <li>
            <span>Grade/GPA</span> *<input type="text" name="gradeGpa" [(ngModel)]="userData.gradeGpa">
           </li> <br>
        </ul>
      </nav>
    </div>
    <hr>
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
export class addEduacation implements OnInit {

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