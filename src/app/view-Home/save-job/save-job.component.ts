import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProxy } from 'src/app/service/proxy/aonntherForproxyOkayUSER.proxy';
import { PostProxyService } from 'src/app/service/proxy/post.proxy';
import { UserNgrxService } from 'src/app/service/state-/ngrx-regualry';

@Component({
  selector: 'app-save-job',
  templateUrl: './save-job.component.html',
  styleUrls: ['./save-job.component.scss']
})
export class SaveJobComponent implements OnInit{
  regUser: any = {};
  userId!: string;
  Jobs: any ={}
  userData: any = {}
  posts!: any
  jobSearchAttempted: boolean = false;
  showRouterOutlet: boolean | undefined;
  somePostId: any
  searchValue: any
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private userProxyS: UserProxy,
    private userNgRx: UserNgrxService,
    private postProxyS: PostProxyService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    // this.activatedRoute.parent?.params.subscribe((params: any) => {
    //   if (params.userId) {
    //     this.userId = params.userId;
    //     this.getRegisteredUser();
    //     this.getJobs(this.userId);
    //   }
    // });
    this.activatedRoute.params.subscribe((params: any) => {
      this.getRegisteredUser();
      this.getJobs(params.userId);
    });
  }

  getjobs() {
    this.postProxyS.getJobsList().subscribe((response: any) => {
      this.posts = response;
    });
  }
  
  
  
  getRegisteredUser() {
    this.userNgRx.getUserData().subscribe(
      (response: any) => {
        this.regUser = response;
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
  
  
  getJobs(userId: string) {
    this.userProxyS.getJob(userId).subscribe(
      (response: any) => {
        this.Jobs = response;
        console.log('getJobs response:', response);
      },
      (error: any) => {
        console.error('Error fetching jobs:', error);
      }
    );
  }

  getUserProfile(userId: string) {
    this.userProxyS.getUserById(userId).subscribe((response: any) => {
      const { password, verificationToken, ...user } = response;
      this.userData = user;
    });
  }
  
  navigateToPost() {
    if (this.isValidPostId()) {
      this.router.navigate(['/post', this.searchValue]);
    } else {
      this.jobSearchAttempted = true;
    }
  }

  private isValidPostId(): boolean {
   //looking
    return this.searchValue.trim() !== '';
  }
}
