import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobListingsComponent } from './view-Home/job-listings/job-listings.component';
import { LoginComponent } from './view-Home/login/login.component';
import { RegisterComponent } from './view-Home/register/register.component';
import { AnotherServiceAuthGuard } from './guards/auth.anotherguards.service';
import { AuthServiceGuard } from './guards/auth.guards.service';
import { ProfilePageComponent } from './view-Home/profile-page/profile-page.component';
import { CommonModule } from '@angular/common';
import { OnlyJobPostIdComponent } from './view-Home/only-job-post-id/only-job-post-id.component';
import { PostPgComponent } from './view-Home/profile-page/theCreatedJobs/jobscr.component';
import { SaveJobComponent } from './view-Home/save-job/save-job.component';
import { PostPgComponents } from './view-Home/job-alerts/theCreatedJobs/jobscr.component';
import { JobAlertsComponent } from './view-Home/job-alerts/job-alerts.component';
import { ApplicateForJob } from './view-Home/formsuibmitApplication/applicatejob';
import { SearchUserPgComponent } from './view-Home/formsuibmitApplication/user/user.s';
import { SearchPostPgComponent } from './view-Home/formsuibmitApplication/posts/postsjobs.s';
const routes: Routes = [
  {
    path:'',
    canActivate: [AuthServiceGuard],
  component: JobListingsComponent
  },

  {path:'login',
  canActivate: [AnotherServiceAuthGuard],
  component: LoginComponent
  },
  {path:'register',
  canActivate: [AnotherServiceAuthGuard],
  component: RegisterComponent
  },

  {
    path: 'post/:postId',
    canActivate: [AuthServiceGuard],
    component: OnlyJobPostIdComponent,
  }, 
  {
    path: 'saveJobs/:userId',
    canActivate: [AuthServiceGuard],
    component: SaveJobComponent,
    
  },
  {
    path: 'JobAlerts/:userId',
    canActivate: [AuthServiceGuard],
    component: JobAlertsComponent,
    children: [
      { path: 'post', component: PostPgComponents },
    ]
  },
  {
    path: 'prolife/:userId',
    canActivate: [AuthServiceGuard],
    component: ProfilePageComponent,
    children: [
      { path: 'post', component: PostPgComponent },
    ]
  },
  {
    path: 'search',
    canActivate: [AuthServiceGuard],
    component: ApplicateForJob,
    children: [
      { path: '', redirectTo: 'posts', pathMatch: 'full' },
      { path: 'posts', component: SearchPostPgComponent },
      { path: 'users', component: SearchUserPgComponent },
    ],
  },
  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
    exports: [RouterModule]
})
export class AppRoutingModule { }


