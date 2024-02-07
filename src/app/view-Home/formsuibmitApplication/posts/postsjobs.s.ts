import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PostProxyService } from 'src/app/service/proxy/post.proxy';
import { SearchProxyService } from 'src/app/service/proxy/search';
import { UserNgrxService } from 'src/app/service/state-/ngrx-regualry';
import { AddnewwjobComponent } from 'src/app/view-Home/addnewwjob/addnewwjob.component';
import { DeletePostModComponent } from 'src/app/view-Home/deletethejob/deletethejob';

@Component({
  selector: 'app-search-post-pg',
  template: `
 <section class="posts-area">
  <article *ngFor="let post of posts; let postIndex = index" class="post-card">
    <div class="post-card-content">
      <div class="post-author">
        <p routerLink="/prolife/{{ post.author._id }}" class="pointer">
          {{ post.author.firstname }} {{ post.author.lastname }}
        </p>
      </div>
      <div class="post-details">
        <p routerLink="/prolife/{{ post.author._id }}" class="pointer">
          <span class="job-title">{{ post.nameofthejob }}</span>
          <span class="job-location">{{ post.location }}</span>
          <span class="job-description">{{ post.description }}</span>
        </p>
      </div>
      <div class="post-actions" *ngIf="regUser._id === post.author._id">
        <button mat-icon-button [matMenuTriggerFor]="postMenu">
          <i class="fa-solid fa-ellipsis-vertical three-dots">Delete</i>
        </button>
        <mat-menu #postMenu="matMenu">
          <button (click)="onPostDeleteBtnClick(post._id)" mat-menu-item>
            Delete
          </button>
        </mat-menu>
      </div>
    </div>
  </article>
</section>

  `,
  styles: [`
  
  .post-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 20px;
}

.post-card-content {
  display: flex;
  justify-content: space-between;
}

.post-author {
  font-weight: bold;
}

.job-title {
  font-size: 18px;
}

.job-location,
.job-description {
  display: block;
  margin-top: 5px;
}

.post-actions {
  align-self: flex-start;
}
`],
})
export class SearchPostPgComponent implements OnInit {
  searchBody: string = '';
  regUser: any = {};
  posts: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchProxyS: SearchProxyService,
    private userNgRxS: UserNgrxService,
    private dialog: MatDialog,
    private postProxyS: PostProxyService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((qParams: any) => {
      this.searchUser(qParams.searchBody);
      this.getRegisteredUser();
    });
  }

  searchUser(searchBody: string) {
    this.searchProxyS.getPostSearch(searchBody).subscribe((response: any) => {
      this.posts = response;
    });
  }

  getRegisteredUser() {
    this.userNgRxS.getUserData().subscribe((user: any) => {
      this.regUser = user;
    });
  }


  onAddNewBtnClick() {
    this.dialog.open(AddnewwjobComponent);
  }


  onPostDeleteBtnClick(postId: string) {
    this.dialog.open(DeletePostModComponent, {
      data: {
        postId: postId,
      },
    });
  }
}