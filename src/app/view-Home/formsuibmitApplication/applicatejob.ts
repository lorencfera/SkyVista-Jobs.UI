import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LoginLogoutEmitterService } from 'src/app/service/emitters/login.emit';
import { AuthProxyService } from 'src/app/service/proxy/auth.proxy.service';
import { PostProxyService } from 'src/app/service/proxy/post.proxy';
import { UserNgrxService } from 'src/app/service/state-/ngrx-regualry';

@Component({
  selector: 'app-updatenrtwo-user',
  template: `
  <article class="tabs-box">
  <nav mat-tab-nav-bar [tabPanel]="tabPanel">
    <a
      routerLink="users"
      [queryParams]="{ searchBody: searchBody }"
      [active]="currentRoute.includes('/users')"
      mat-tab-link
    >
      Users
    </a>
    <a
      routerLink="posts"
      [queryParams]="{ searchBody: searchBody }"
      [active]="currentRoute.includes('/posts')"
      mat-tab-link
    >
      Posts
    </a>
  </nav>
</article>
<mat-tab-nav-panel #tabPanel></mat-tab-nav-panel>

<section>
  <router-outlet></router-outlet>
</section>
  `,
  styles: [`
  form {
  max-width: 400px;
  margin: 0 auto;

}

.applicant {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

:host {
  width: 100%;
  height: 100%;
}

.tabs-box {
  display: flex;
  justify-content: center;
}
`]
})
export class ApplicateForJob implements OnInit {
  currentRoute: any = '';
  searchBody: string = '';
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.router.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd) {
        this.currentRoute = val.urlAfterRedirects;
      }
    });
    this.activatedRoute.queryParams.subscribe((qParams: any) => {
      this.searchBody = qParams.searchBody;
    });
  }
}