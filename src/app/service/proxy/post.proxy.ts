import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "../local-storage.service";
import { environment } from "src/enviroment/enviroment";

@Injectable({
    providedIn: 'root',
  })
  export class PostProxyService {
    constructor(
      private proxy: HttpClient,
      private localStorageS: LocalStorageService
    ) {}

    getFeed() {
        const fullUrl = `${environment.apiBaseUrl}/post/job/get`;
        const jwt: any = this.localStorageS.getWithExpiry('jwt');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
        return this.proxy.get(fullUrl, { headers: headers });
      }

    getProfilePost(userId: string) {
        const fullUrl = `${environment.apiBaseUrl}/post/prolife/${userId}`;
        const jwt: any = this.localStorageS.getWithExpiry('jwt');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
        return this.proxy.get(fullUrl, { headers: headers });
      }

    addPost(postData: any) {
        const fullUrl = `${environment.apiBaseUrl}/post`;
        const jwt: any = this.localStorageS.getWithExpiry('jwt');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
        return this.proxy.post(fullUrl, postData, { headers: headers });
      }

    getPost(postId: string) {
        const fullUrl = `${environment.apiBaseUrl}/post/${postId}`;
        const jwt: any = this.localStorageS.getWithExpiry('jwt');
        const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
        return this.proxy.get(fullUrl, { headers: headers });
      }
    
  }