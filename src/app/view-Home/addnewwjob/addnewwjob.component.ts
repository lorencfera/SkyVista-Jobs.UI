import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostAddEmitterService } from 'src/app/service/emitters/post.emit';
import { PostProxyService } from 'src/app/service/proxy/post.proxy';
import { UserNgrxService } from 'src/app/service/state-/ngrx-regualry';

@Component({
  selector: 'app-addnewwjob',
  templateUrl: './addnewwjob.component.html',
  styleUrls: ['./addnewwjob.component.scss']
})
export class AddnewwjobComponent implements OnInit {
  userData: any = {};
  nameofthejob: any
  loaction: any
  worktypes: any
  fte: any
  shift: any
  hours: any
  description: any
  requrements: any
  position: any
  category: any

  constructor(
    private userNgRxS: UserNgrxService,
    private postProxyS: PostProxyService,
    private postAddEmitter: PostAddEmitterService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getRegisteredUser();
  }

  getRegisteredUser() {
    this.userNgRxS.getUserData().subscribe((response) => {
      this.userData = response;
    });
  }


  onSubmit() {
    this.postProxyS.addPost({nameofthejob: 
      this.nameofthejob, loaction: this.loaction, worktypes:  this.worktypes,
      fte: this.fte, shift: this.shift, hours: this.hours, description: this.description, requrements: this.requrements,
      position: this.position, category: this.category}).subscribe((response) => {
        if (response) {
          this.postAddEmitter.postAddEmitter.emit(true);
          this.dialog.closeAll();
        }
      });
  }
}
