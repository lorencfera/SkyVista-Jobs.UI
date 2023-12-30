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
    path: 'prolife/:userId',
    canActivate: [AuthServiceGuard],
    component: ProfilePageComponent,
    children: [
      { path: 'post', component: PostPgComponent },
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
    exports: [RouterModule]
})
export class AppRoutingModule { }


