import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserProxy } from 'src/app/service/proxy/aonntherForproxyOkayUSER.proxy';
import { PostProxyService } from 'src/app/service/proxy/post.proxy';
import { UserNgrxService } from 'src/app/service/state-/ngrx-regualry';
import { SaveJobComponent } from '../save-job/save-job.component';
import { DeletePostModComponent } from '../deletethejob/deletethejob';

@Component({
  selector: 'app-only-job-post-id',
  templateUrl: './only-job-post-id.component.html',
  styleUrls: ['./only-job-post-id.component.scss']
})
export class OnlyJobPostIdComponent implements OnInit{
  userData: any = {};
  posts: any = {};
  users: any = {}
  constructor(
    private userNgRxS: UserNgrxService,
    private postProxyS: PostProxyService,
    private activatedRoute: ActivatedRoute,
    private UserProxy: UserProxy,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.getRegisteredUser();
      this.getPost(params.postId);
    });
  }

  getRegisteredUser() {
    this.userNgRxS.getUserData().subscribe((response: any) => {
      this.userData = response;
    });
  }

  getPost(postId: string) {
    this.postProxyS.getPost(postId).subscribe((response: any) => {
      this.posts = response;
    },
    (error) => {
      console.error('Error fetching post:', error);
    });
  }

  saveJob(jobId: string): void {
    // Assume you have a user ID, replace 'userId' with the actual user ID
    // this.userNgRxS.getUserData().subscribe(
    //   (userData) => {
    //     const userId = userData._id; // Adjust this based on your user data structure
    //   })
    const userId = this.userData._id;
      this.UserProxy.saveJob(jobId, userId).subscribe(
        (data) => {
          console.log('Job saved successfully:', data);
        },
        (error) => {
          console.error('Error saving job:', error);
        }
      );
  }
  
  onPostDeleteBtnClick(postId: string) {
    this.dialog.open(DeletePostModComponent, {
      data: {
        postId: postId,
      },
    });
  }

  getUsers() {
    this.UserProxy.getUser().subscribe(
      (response) => {
        this.users = response;
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  
}
