import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { PostAddEmitterService } from "src/app/service/emitters/post.emit";
import { PostProxyService } from "src/app/service/proxy/post.proxy";
import { UserNgrxService } from "src/app/service/state-/ngrx-regualry";
import { AddnewwjobComponent } from "../../addnewwjob/addnewwjob.component";
import { UserProxy } from "src/app/service/proxy/aonntherForproxyOkayUSER.proxy";
import { DeletePostModComponent } from "../../deletethejob/deletethejob";

@Component({
    selector: 'app-job-pg',
    templateUrl: './jobscr.component.html',
    styleUrls: ['./job.component.scss'],
  })
  export class PostPgComponents implements OnInit {
    userData: any = {};
  regUser: any = {};
  posts!: any[];

  constructor(
    private dialog: MatDialog,
    private userNgRxS: UserNgrxService,
    private postProxyS: PostProxyService,
    private postAddEmitter: PostAddEmitterService,
    private activatedRoute: ActivatedRoute,
    private userProxyS: UserProxy
  ) {}

  ngOnInit(): void {
    this.postAddEmitter.postAddEmitter.subscribe((response) => {
      this.getProfilePost(this.userData._id);
    });
    this.activatedRoute.parent?.params.subscribe((params: any) => {
      this.getRegisteredUser();
      this.getUserProfile(params.userId);
      this.getProfilePost(params.userId);
    });
  }

  getRegisteredUser() {
    this.userNgRxS.getUserData().subscribe((response: any) => {
      this.regUser = response;
    });
  }

  onPostDeleteBtnClick(postId: string) {
    this.dialog.open(DeletePostModComponent, {
      data: {
        postId: postId,
      },
    });
  }

  getUserProfile(userId: string) {
    this.userProxyS.getUserById(userId).subscribe((response: any) => {
      const { password, verificationToken, ...user } = response;
      this.userData = user;
    });
  }

  getProfilePost(userId: string) {
    this.postProxyS.getProfilePost(userId).subscribe((posts: any) => {
      this.posts = posts;
    });
  }
}