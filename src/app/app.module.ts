import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobListingsComponent } from './view-Home/job-listings/job-listings.component';
import { RegisterComponent } from './view-Home/register/register.component';
import { LoginComponent } from './view-Home/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { UserReducer } from './ngrx/reducer/user.reducer';
import { LoadingService } from './interceptors/loadinng.service';
import { LoadersInterceptors } from './interceptors/loaders.service';
import { ProfilePageComponent } from './view-Home/profile-page/profile-page.component';
import { UpdateUserComponent } from './view-Home/update-user/update-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { PostPgComponent } from '../app/view-Home/profile-page/theCreatedJobs/jobscr.component'
import { UpdateUserComponentnrtwo } from '../app/view-Home/forUpdates/updatenrtwo';
import { AddnewwjobComponent } from './view-Home/addnewwjob/addnewwjob.component'
import { AddPositionAndEduationUpdated } from './view-Home/forUpdates/addpostioneduaction.update';
import { addEduacation } from './view-Home/forUpdates/addEducation';
import { OnlyJobPostIdComponent } from './view-Home/only-job-post-id/only-job-post-id.component';
import { SaveJobComponent } from './view-Home/save-job/save-job.component';
import { DeletePostModComponent } from './view-Home/deletethejob/deletethejob';
import { MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import { JobAlertsComponent } from './view-Home/job-alerts/job-alerts.component';
import { PostPgComponents } from './view-Home/job-alerts/theCreatedJobs/jobscr.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SearchUserPgComponent } from './view-Home/formsuibmitApplication/user/user.s'; 
import { SearchPostPgComponent } from './view-Home/formsuibmitApplication/posts/postsjobs.s'; 
import { ApplicateForJob } from '../app/view-Home/formsuibmitApplication/applicatejob';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    SearchPostPgComponent,
    ApplicateForJob,
    SearchUserPgComponent,
    PostPgComponent,
    addEduacation,
    PostPgComponents,
    DeletePostModComponent,
    JobListingsComponent,
    UpdateUserComponentnrtwo,
    RegisterComponent,
    LoginComponent,
    ProfilePageComponent,
    UpdateUserComponent,
    AddnewwjobComponent,
    AddPositionAndEduationUpdated,
    OnlyJobPostIdComponent,
    SaveJobComponent,
    JobAlertsComponent,
  ],
  imports: [
    BrowserModule,
    MatMenuModule,
    MatPaginatorModule,
    FormsModule,
    MatTabsModule,
    MatSidenavModule,
    MatDialogModule,
    HttpClientModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot({
      user: UserReducer.Reduce as ActionReducer<any>,
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    LoadingService,
    LoadersInterceptors,
    {
      useClass: LoadersInterceptors,
      provide: HTTP_INTERCEPTORS,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
