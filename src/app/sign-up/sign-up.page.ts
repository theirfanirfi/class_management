import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonInput, IonCard, IonCardContent, IonItem, IonButton } from '@ionic/angular/standalone';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AuthSupaBaseServiceService } from '../auth-supa-base-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonLabel, IonInput, IonCard, IonCardContent, IonItem, IonButton]
})
export class SignUpPage implements OnInit {
  email = ''
  password = ''
  teacher_name = ''
  constructor(private authService: AuthService, private router: Router, private authdb: AuthSupaBaseServiceService) { }

  ngOnInit() {
  }

  async signup() {
    // if (this.authService.signup(this.email, this.password)) {
      let user = await this.authdb.register_user({teacher_name: this.teacher_name, email: this.email, password: this.password, role: 'teacher'});
     
      if(user){
        let obj = {
          id: user[0].id,
          teacher_name: user[0].teacher_name,
          role: user[0].role

        };
        if(this.authService.storeUser(obj)){
          this.router.navigate(['/home']);
        }
      }else {
        alert("User already registered");
      }
    // } else {
    //   alert('User already exists.');
    // }
  }

  gotoLoginPage(){
    this.router.navigate(['/login']);
  }

}
