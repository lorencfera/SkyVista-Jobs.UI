import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService { 
    constructor(){}

    setExp(key: any, value: any, ttl: any) {
        const now = new Date();
        const item = {
          value: value,
          expiry: now.getTime() + ttl,
        };
        localStorage.setItem(key, JSON.stringify(item));
      }

    getWithExpiry(key: any) {
        const itemStr = localStorage.getItem(key);   //the key is ['jwt']
        if (!itemStr) {
          return null;
        }
        const item = JSON.parse(itemStr);
        const now = new Date();
        if (now.getTime() > item.expiry) {
          localStorage.removeItem(key);
          return null;
        }
        return item.value;
      }
}