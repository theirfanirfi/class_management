import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  storeUser(obj: any): boolean {
      localStorage.setItem('user', JSON.stringify(obj));
      return true;
    
  }

  getUser() {
    return localStorage.getItem('user')
  }

  logout() {
    localStorage.removeItem('user');
  }
}
