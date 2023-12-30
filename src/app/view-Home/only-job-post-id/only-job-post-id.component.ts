import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserProxy } from 'src/app/service/proxy/aonntherForproxyOkayUSER.proxy';
import { PostProxyService } from 'src/app/service/proxy/post.proxy';
import { UserNgrxService } from 'src/app/service/state-/ngrx-regualry';

@Component({
  selector: 'app-only-job-post-id',
  templateUrl: './only-job-post-id.component.html',
  styleUrls: ['./only-job-post-id.component.scss']
})
export class OnlyJobPostIdComponent implements OnInit{
  userData: any = {};
  post: any = {};

  constructor(
    private dialog: MatDialog,
    private userNgRxS: UserNgrxService,
    private postProxyS: PostProxyService,
    private activatedRoute: ActivatedRoute,
    private userProxyS: UserProxy,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.getRegisteredUser();
      this.getPost(params.postId);
    });
  }

  getRegisteredUser() {
    this.userNgRxS.getUserData().subscribe((response) => {
      this.userData = response;
    });
  }

  getPost(postId: string) {
    this.postProxyS.getPost(postId).subscribe((response) => {
      this.post = response;
    });
  }



}
