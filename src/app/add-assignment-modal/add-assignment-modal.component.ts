import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon,
  IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem,
IonList, IonRefresher, IonRefresherContent, IonButton, IonFooter, IonInput, IonButtons,
IonDatetimeButton, IonDatetime, IonModal, IonTextarea, IonPicker, IonPickerColumnOption, IonPickerColumn } from '@ionic/angular/standalone';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-add-assignment-modal',
  templateUrl: './add-assignment-modal.component.html',
  styleUrls: ['./add-assignment-modal.component.scss'],
  standalone: true,
  providers: [ModalController, ReactiveFormsModule],
  imports: [IonButton, IonFooter, IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon,
    IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem,
  IonList, IonRefresher, IonRefresherContent, IonInput, IonButtons, FormsModule, 
  IonDatetimeButton, IonDatetime, IonModal, IonPicker,IonPickerColumn, IonPickerColumnOption, IonTextarea]
})
export class AddAssignmentModalComponent implements OnInit{
  // classForm: FormGroup;
  disabled: boolean = true;
  assignment_title= '';
  assignment_description= '';
  class_id = '';
  start_time = '';
  end_time = '';
  classes: any [] = [];

  constructor(
    private modalController: ModalController,
    private supabase: SupabaseService
  ) {
    
  }

  async ngOnInit() {
    this.classes = await this.supabase.getClasses();
    console.log('myclasses',this.classes)
  }

  async close() {
    await this.modalController.dismiss();
  }

  dealChange(event: any, field: string){
    console.log(field, event.target.value)
    switch(field){
      case 'title':
        this.assignment_title = event.target.value
        break;
      case 'description':
          this.assignment_description = event.target.value
          break;
      case 'class':
        this.class_id = event.target.value
        break;
      case 'start_time':
          this.start_time = event.target.value
          break;
      case 'end_time':
          this.end_time = event.target.value
          break;
    }
    console.log(this)
  }

  async save() {
    console.log('clicked');
    let teacher_id = this.supabase.authService.getUserId();

    let isSaved = await this.supabase.addAssignment({assignment_title: this.assignment_title, 
      assignment_description: this.assignment_description, 
      class_id: parseInt(this.class_id), start_time: this.start_time,
       end_time: this.end_time, teacher_id: teacher_id})

    console.log(isSaved)
    if (isSaved != null) {
      this.assignment_title = ''
      this.assignment_description = ''
      this.class_id = ''
      await this.modalController.dismiss(isSaved);
    }else {
      console.log('error');
    }
  }
}

