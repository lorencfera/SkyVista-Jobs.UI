import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserNgrxService } from 'src/app/service/state-/ngrx-regualry';
import { AddnewwjobComponent } from '../addnewwjob/addnewwjob.component';
import { PostProxyService } from 'src/app/service/proxy/post.proxy';
import { PostAddEmitterService } from 'src/app/service/emitters/post.emit';
import { Router } from '@angular/router';
import { UserProxy } from 'src/app/service/proxy/aonntherForproxyOkayUSER.proxy';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-job-listings',
  templateUrl: './job-listings.component.html',
  styleUrls: ['./job-listings.component.scss']
})
export class JobListingsComponent implements OnInit{
  userData: any = {};
  post!: any[]
  jobSearchAttempted: boolean = false;
  showRouterOutlet: boolean | undefined;
  searchValue: any
  users!: any[]
  searchForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userNgRxS: UserNgrxService,
    private dialog: MatDialog,
    private postProxyS: PostProxyService,
    private postAddEmitter: PostAddEmitterService,
    private router: Router,
    private UserProxys: UserProxy,
  ) {
    this.searchForm = this.fb.group({
      nameofthejob: [''],
      id: ['']
    });
  }

  ngOnInit(): void {
    this.postAddEmitter.postAddEmitter.subscribe((response:any) => {
      this.getjobs();
    });
    this.getRegisteredUser();
    this.getjobs();
  }
 

  getRegisteredUser() {
    this.userNgRxS.getUserData().subscribe((response: any) => {
      this.userData = response;
    });
  } 
  onAddNewBtnClick() {
      this.dialog.open(AddnewwjobComponent);
    }

  getjobs() {
      this.postProxyS.getJobsList().subscribe((response: any) => {
        this.post = response;
      });
    }

    saveJob(jobId: string): void {

      const userId = this.userData._id;
        this.UserProxys.saveJob(jobId, userId).subscribe(
          (data) => {
            console.log('Job saved successfully:', data);
          },
          (error) => {
            console.error('Error saving job:', error);
          }
        );
    }
    
 }
