import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor() {
   }

  storeUser(obj: any): boolean {
      localStorage.setItem('user', JSON.stringify(obj));
      return true;
    
  }

   getUser() {
    let user = localStorage.getItem('user')
    return JSON.parse(user!);

  }

  getUserId(){
    let user = this.getUser();
    return user.id;
  }

  logout() {
    localStorage.removeItem('user');
  }
}
