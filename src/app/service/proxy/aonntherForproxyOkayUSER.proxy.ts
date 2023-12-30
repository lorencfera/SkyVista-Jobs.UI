import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/enviroment/enviroment";
import { LocalStorageService } from "../local-storage.service";
import { Injectable } from "@angular/core";

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

  

  
}