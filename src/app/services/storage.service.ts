import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export default class StorageService {

  constructor() { }

  get(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
