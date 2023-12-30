import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroment/enviroment';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthProxyService {
  constructor(
    private proxy: HttpClient,
    private localStorageSs: LocalStorageService
  ) {}

  registerUser(userData: any) {
    const fullUrl = `${environment.apiBaseUrl}/auth/register`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.proxy.post(fullUrl, userData, { headers: headers} );
  }

  loginUser(userData: any) {
    const fullUrl = `${environment.apiBaseUrl}/auth/login`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.proxy.post(fullUrl, userData, { headers: headers });
  }

  whoami() {
    const fullUrl = `${environment.apiBaseUrl}/auth/whoami`;
    const jwt: any = this.localStorageSs.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.get(fullUrl, { headers: headers });
  }

  getUserById(userId: string) {
    const fullUrl = `${environment.apiBaseUrl}/user/prolife/${userId}`;
    const jwt: any = this.localStorageSs.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.get(fullUrl, { headers: headers });
  }

  updateUser(userData: any) {
    const fullUrl = `${environment.apiBaseUrl}/auth/update`;
    const jwt: any = this.localStorageSs.getWithExpiry('jwt');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${jwt}`)
      .set('content-type', 'application/json');
    return this.proxy.put(fullUrl, userData, { headers: headers });
  }
}