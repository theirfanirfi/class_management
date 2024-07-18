import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonInput, IonCard, IonCardContent, IonItem, IonButton } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthSupaBaseServiceService } from '../auth-supa-base-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonInput, IonCard, IonCardContent, IonItem, IonButton]
})
export class LoginPage implements OnInit {
  email = ''
  password = ''

  constructor(private authService: AuthService, private router: Router, private authdb: AuthSupaBaseServiceService) { }

  ngOnInit() {
  }

  async login() {
  
    let user = await this.authdb.getUserForLogin({email: this.email, password: this.password})
    if(user){
      let obj = {
        id: user[0].id,
        teacher_name: user[0].teacher_name,
        role: user[0].role
      }
      this.authService.storeUser(obj);
  this.router.navigate(['/home']);
    
    } else {
      alert('Invalid credentials.');
    }
  }

  gotoSignUpPage(){
    this.router.navigate(['/signup']);
  }
}
