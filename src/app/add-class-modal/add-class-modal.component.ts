// src/app/components/add-class-modal/add-class-modal.component.ts
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon,
  IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem,
IonList, IonRefresher, IonRefresherContent, IonButton, IonFooter, IonInput, IonButtons,
IonDatetimeButton, IonDatetime, IonModal, IonTextarea } from '@ionic/angular/standalone';
import {FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-add-class-modal',
  templateUrl: './add-class-modal.component.html',
  styleUrls: ['./add-class-modal.component.scss'],
  standalone: true,
  providers: [ModalController, ReactiveFormsModule],
  imports: [IonButton, IonFooter, IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon,
    IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem,
  IonList, IonRefresher, IonRefresherContent, IonInput, IonButtons, FormsModule, 
  IonDatetimeButton, IonDatetime, IonModal, IonTextarea]
})
export class AddClassModalComponent {
  // classForm: FormGroup;
  disabled: boolean = true;
  class_title = '';
  class_description = '';
  class_time = '';

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private supabase: SupabaseService
  ) {
    // this.classForm = this.formBuilder.group({
    //   name: ['', [Validators.required]],
    //   description: ['', [Validators.required]],
    // });
  }

  async close() {
    await this.modalController.dismiss();
  }

  dealChange(event: any, field: string){
    switch(field){
      case 'title':
        this.class_title = event.target.value
        break;
        case 'description':
          this.class_description = event.target.value
          break;
          case 'datetime':
            this.class_time = event.target.value
    }
    console.log(this.class_title, this.class_description, this.class_time)
  }

  async save() {
    console.log('clicked');
    let teacher_id = 1;
    let isSaved = await this.supabase.addClass({class_title: this.class_title, class_description: this.class_description, time: this.class_time, teacher_id: teacher_id})
    console.log(isSaved)
    if (isSaved != null) {
      this.class_title = ''
      this.class_description = ''
      this.class_time = ''
      await this.modalController.dismiss(isSaved);
    }else {
      console.log('error');
    }
  }
}
