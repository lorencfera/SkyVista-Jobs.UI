import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PostAddEmitterService } from 'src/app/service/emitters/post.emit';
import { PostProxyService } from 'src/app/service/proxy/post.proxy';

@Component({
  selector: 'app-delete-post-mod',
  template: `
  <button
  mat-button
  mat-dialog-close
>
  <i class="fa-solid fa-xmark">X</i>
</button>
<h1 mat-dialog-title>Are you absolutely sure?</h1>
<p>This action is irreversible!</p>
<div
  
  mat-dialog-actions
>
  <button
  class="button-15" role="button"
    (click)="deletePost()"
    color="primary"
    mat-dialog-close
    mat-button
  >
    I understand the consequences,<br />
    delete this Post!
  </button>
</div>
  `,
  styles: [`
  
.button-15 {
    background-image: linear-gradient(#42A1EC, #0070C9);
    border: 1px solid #0077CC;
    border-radius: 4px;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    direction: ltr;
    display: block;
    font-family: "SF Pro Text","SF Pro Icons","AOS Icons","Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 17px;
    font-weight: 400;
    letter-spacing: -.022em;
    line-height: 1.47059;
    min-width: 110px;
    overflow: visible;
    padding: 4px 15px;
    text-align: center;
    vertical-align: baseline;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    margin-right: 10px;
  }
  
  .button-15:disabled {
    cursor: default;
    opacity: .3;
  }
  
  .button-15:hover {
    background-image: linear-gradient(#51A9EE, #147BCD);
    border-color: #1482D0;
    text-decoration: none;
  }
  
  .button-15:active {
    background-image: linear-gradient(#3D94D9, #0067B9);
    border-color: #006DBC;
    outline: none;
  }
  
  .button-15:focus {
    box-shadow: rgba(131, 192, 253, 0.5) 0 0 0 3px;
    outline: none;
  }
  
  `],
})
export class DeletePostModComponent implements OnInit {
  constructor(
    private postProxyS: PostProxyService,
    private dialog: MatDialog,
    private postAddEmitter: PostAddEmitterService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {}

  ngOnInit(): void {}

  deletePost() {
    this.postProxyS.deletePost(this.data.postId).subscribe((response) => {
      this.postAddEmitter.postAddEmitter.emit(true);
      this.dialog.closeAll();
      if (confirm('Your job that you posted has been deleted')) {
        this.router.navigate(['']);
      }else {
        this.router.navigate(['']);
      }
    });
  }
}