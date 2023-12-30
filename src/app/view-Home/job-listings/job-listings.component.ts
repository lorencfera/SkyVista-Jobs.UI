import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserNgrxService } from 'src/app/service/state-/ngrx-regualry';
import { AddnewwjobComponent } from '../addnewwjob/addnewwjob.component';
import { PostProxyService } from 'src/app/service/proxy/post.proxy';
import { PostAddEmitterService } from 'src/app/service/emitters/post.emit';

@Component({
  selector: 'app-job-listings',
  templateUrl: './job-listings.component.html',
  styleUrls: ['./job-listings.component.scss']
})
export class JobListingsComponent implements OnInit{
  posts!: any[];
  userData: any = {};

  constructor(
    private userNgRxS: UserNgrxService,
    private dialog: MatDialog,
    private postProxyS: PostProxyService,
    private postAddEmitter: PostAddEmitterService
  ) {}

  ngOnInit(): void {
    this.postAddEmitter.postAddEmitter.subscribe((response:any) => {
      this.getFeed();
    });
    this.getFeed();
    this.getRegisteredUser();
  }
 

  getRegisteredUser() {
    this.userNgRxS.getUserData().subscribe((response: any) => {
      this.userData = response;
    });

   
  } 
  onAddNewBtnClick() {
      this.dialog.open(AddnewwjobComponent);
    }

    getFeed() {
      this.postProxyS.getFeed().subscribe((posts: any) => {
        this.posts = posts;
      });
    }
 }
