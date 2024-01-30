import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/enviroment/enviroment";
import { LocalStorageService } from "../local-storage.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
  export class UserProxy {
    constructor(
      private proxy: HttpClient,
      private localStorageSs: LocalStorageService
    ) {}
getUserById(userId: string) {
    const fullUrl = `${environment.apiBaseUrl}/user/prolife/${userId}`;
    const jwt: any = this.localStorageSs.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.get(fullUrl, { headers: headers });
  }

  
  saveJob(userId: string, postId: string): Observable<any> {
    const fullUrl = `${environment.apiBaseUrl}/user/JobSaves/${userId}`;
    const jwt: any = this.localStorageSs.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    
    const options = { headers: headers };
    
    return this.proxy.post(fullUrl, { postId }, options);
  }
  

  getJob(userId: string): Observable<any> {
    const fullUrl = `${environment.apiBaseUrl}/user/JobSaves/${userId}`;
    const jwt: any = this.localStorageSs.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);

    const options = { headers: headers };

    return this.proxy.get(fullUrl, options);
}

getUser() {
  const fullUrl = `${environment.apiBaseUrl}/user/userat`;
  const jwt: any = this.localStorageSs.getWithExpiry('jwt');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
  const options = { headers: headers }
  return this.proxy.get(fullUrl, options );
}
  
}