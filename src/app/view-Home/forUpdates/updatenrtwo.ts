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
    <h2>Work Preferences</h2>
    <div class="InputXZ">
      <nav>
        <ul>
          <li>
            <span>Are You An Employee?</span> *
            <select class="form-select" name="employmenttype" id="employmenttype" [(ngModel)]="userData.employmenttype">
              <option value="No">No</option>
              <option value="Previous Employee?">Previous Employee?</option>
              <option value="Current Employee?">Current Employee?</option>
            </select>
          </li> <br>
          <li>
            <span>Preferred Employment Type</span> *
            <select class="form-select" id="preferredEmploymentType">
              <option value="4">Employee?</option>
              <option value="5">Physician</option>
              <option value="6">Resident</option>
            </select>
          </li> <br>
          <li>
            <span>Work Type</span> *
            <select class="form-select" id="workType">
              <option value="8">Full Time</option>
              <option value="9">Part Time</option>
              <option value="10">Non paid</option>
            </select>
          </li> <br>
        </ul>
      </nav>
    </div>

    <hr>

    <h2>Other Preferences</h2>
    <div class="InputXZ">
      <nav>
        <ul>
          <li>
            <span>Willing To Relocate?</span> *
            <select class="form-select" id="willingToRelocate" >
              <option value="11">Yes</option>
              <option value="12">No</option>
            </select>
          </li> <br>
          <li>
            <span>Point of Origin</span> *
            <select class="form-select" id="pointOfOrigin">
              <!-- Add options as needed -->
            </select>
          </li> <br>
          <li>
            <span>Willing To Travel?</span> *
            <select class="form-select" id="willingToTravel">
              <option value="13">No</option>
              <option value="14">Yes</option>
            </select>
          </li> <br>
          <li>
            <span>Salary Expectation?</span> *
            <select class="form-select" id="salarexpection" [(ngModel)]="userData.salarexpection">
              <option value="Hourly">Hourly</option>
              <option value="Annual Salary">Annual Salary</option>
              <option value="Monthly Salary">Monthly Salary</option>
            </select>
          </li> <br>
          <li>
            <span>When Can You Start?</span> *
            <select class="form-select" id="whencanyoustart" [(ngModel)]="userData.whencanyoustart">
              <option value="Immediately">Immediately</option>
              <option value="One Week">One Week</option>
              <option value="Two Weeks">Two Weeks</option>
              <option value="Specific Date">Specific Date</option>
              <option value="Available Date Range">Available Date Range</option>
            </select>
          </li> <br>
        </ul>
      </nav>
    </div>
    <p>If Specific Date, specify date: </p>
    <div class="range">
      <li><span>Object</span> *<input type="text" style="width: 213px; height: 101px;"></li><br>
    </div>
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
export class UpdateUserComponentnrtwo implements OnInit {

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