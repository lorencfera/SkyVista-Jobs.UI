import { Component } from '@angular/core';
import { LoginLogoutEmitterService } from './service/emitters/login.emit';
import { UserNgrxService } from './service/state-/ngrx-regualry';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from './interceptors/loadinng.service';
import { PostProxyService } from './service/proxy/post.proxy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  afterLoginDisplay: boolean = localStorage.getItem('jwt') ? true : false;
  userData: any = {};
  searchValue: any;
  loader: boolean = false;
  posts: any ={}
  job: any;
  jobSearchAttempted: boolean = false;
  showRouterOutlet: boolean | undefined;
  somePostId: any
  constructor(
    private loginoutEmitter: LoginLogoutEmitterService,
    private userNgRxS: UserNgrxService,
    private router: Router,
    private loadingService: LoadingService,
    private postSrv: PostProxyService,
    private activatedRoute: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.setLoading();
    this.getUsersssssssssProlife()
    this.loginoutEmitter.loginlogoutEmitter.subscribe((response: boolean) => {
      this.afterLoginDisplay = response;
    });
      // this.activatedRoute.params.subscribe((params: any) => {
      //  this.getPost(params.postId)
      // });
  
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

  getUsersssssssssProlife() { 
    this.userNgRxS.getUserData().subscribe((response: any) => {
      this.userData = response;
    });
  }

  setLoading() {
    this.loadingService.loadingEmit.subscribe((response: any) => {
      this.loader = response;
    });
  }

logOut() {
  localStorage.removeItem('jwt');
  this.userNgRxS.deleteUserData();
  this.loginoutEmitter.loginlogoutEmitter.emit(false);
  this.router.navigate(['login']);
}

searchJob(postId: string) {
  this.jobSearchAttempted = true;
    this.postSrv.getPost(postId).subscribe((result) => {
        this.posts = result;
        this.showRouterOutlet = true;
      },
      (error) => {
        console.error('Error searching for job:', error);
      }
)}

getPost(postId: string) {
  this.postSrv.getPost(postId).subscribe((response: any) => {
    this.posts = response;
  },
  (error) => {
    console.error('Error fetching post:', error);
  });
}
}
