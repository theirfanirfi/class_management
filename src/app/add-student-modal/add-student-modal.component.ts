import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon,
  IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem,
IonList, IonRefresher, IonRefresherContent, IonButton, IonFooter, IonInput, IonButtons,
IonDatetimeButton, IonDatetime, IonModal, IonTextarea, IonPicker, IonPickerColumnOption, IonPickerColumn } from '@ionic/angular/standalone';
import {FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-add-student-modal',
  templateUrl: './add-student-modal.component.html',
  styleUrls: ['./add-student-modal.component.scss'],
  standalone: true,
  providers: [ModalController, ReactiveFormsModule],
  imports: [IonButton, IonFooter, IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon,
    IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem,
  IonList, IonRefresher, IonRefresherContent, IonInput, IonButtons, FormsModule, 
  IonDatetimeButton, IonDatetime, IonModal, IonPicker,IonPickerColumn, IonPickerColumnOption]
})
export class AddStudentModalComponent implements OnInit{
  // classForm: FormGroup;
  disabled: boolean = true;
  student_name = '';
  class_id = '';
  classes: any [] = [];

  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
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
    switch(field){
      case 'name':
        this.student_name = event.target.value
        break;
        case 'class':
          this.class_id = event.target.value
          break;
    }
    console.log(this.student_name, this.class_id)
  }

  async save() {
    console.log('clicked');
    let teacher_id = 1;
    let isSaved = await this.supabase.addStudent({student_name: this.student_name, class_id: parseInt(this.class_id), teacher_id: teacher_id})
    console.log(isSaved)
    if (isSaved != null) {
      this.student_name = ''
      this.class_id = ''
      await this.modalController.dismiss(isSaved);
    }else {
      console.log('error');
    }
  }
}

