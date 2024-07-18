import { Injectable } from '@angular/core';
import { SupabaseService } from './services/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthSupaBaseServiceService extends SupabaseService {

  constructor() { 
    super();
  }

  async register_user(newUser : {teacher_name: string, email: string, password: string, role: string}){
    newUser.role = 'teacher';
    const { data, error } =  await this.supabase.from('users').insert([newUser]).select();
    if (error) {
      console.error('Error registring user: ', error);
      return null;
    }
    return data;

  }

  async getUserForLogin(user: {email: string, password: string}){
    const { data, error } =  await this.supabase.from('users').select().eq('email', user.email).eq('password', user.password)
    if (error) {
      console.error('Error login user: ', error);
      return null;
    }
    return data;
  }
}
