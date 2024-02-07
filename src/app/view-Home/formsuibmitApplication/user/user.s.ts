import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SearchProxyService } from 'src/app/service/proxy/search';
import { UserProxy } from 'src/app/service/proxy/aonntherForproxyOkayUSER.proxy';
import { UserNgrxService } from 'src/app/service/state-/ngrx-regualry';

@Component({
  selector: 'app-search-user-pg',
  template: `
  <section>
  <article *ngFor="let user of users">
    <span class="pointer" routerLink="/prolife/{{ user._id }}">{{
      user.firstname
    }} {{user.lastname}}</span>
  </article>
</section>
  `,
  styles: [`
  section {
  padding: 50px;
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
}

article {
  border-radius: 5px;
  padding: 10px;
  color: black;
  background-color: rgb(243, 235, 219);
  display: flex;
  justify-content: center;
  gap: 20px;
  align-items: center;
}
  
.pointer {
  cursor: pointer;
}
`],
})
export class SearchUserPgComponent implements OnInit {
  searchBody: string = '';
  regUser: any = {};
  users: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchProxyS: SearchProxyService,
    private userNgRxS: UserNgrxService,
    private userProxyS: UserProxy,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((qParams: any) => {
      this.searchUser(qParams.searchBody);
      this.getRegisteredUser();
    });
  }

  searchUser(searchBody: string) {
    this.searchProxyS.getUserSearch(searchBody).subscribe((response: any) => {
      this.users = response;
    });
  }

  getRegisteredUser() {
    this.userNgRxS.getUserData().subscribe((user: any) => {
      this.regUser = user;
    });
  }
}