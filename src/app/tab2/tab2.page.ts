import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon,
  IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem,
IonList, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { SupabaseService } from '../services/supabase.service';
import { AddStudentModalComponent } from '../add-student-modal/add-student-modal.component';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  providers: [ModalController],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,
    ExploreContainerComponent, IonFab, IonFabButton, IonIcon, IonLabel, IonCard,
    IonCardContent,IonCardHeader,IonCardTitle, IonItem, IonList, IonRefresher,
     IonRefresherContent ],
})
export class Tab2Page implements OnInit {
  students: any[] = [];

  constructor(private supabaseService: SupabaseService, private modalController: ModalController) {}


  navigateToAddToClassPage (){
  }

  async ngOnInit() {
    this.students = await this.supabaseService.getStudents();
    console.log('mystudents',this.students)
  }

  async refreshStudents(event: any) {
    this.students = await this.supabaseService.getStudents();
    event.target.complete();
  }

  async openStudentModal() {
    const modal = await this.modalController.create({
      component: AddStudentModalComponent,
    });

    modal.onDidDismiss().then(async (result) => {
      // if (result.data) {
      //   await this.supabaseService.addClass(result.data);
        this.students = await this.supabaseService.getStudents();
      // }
    });

    await modal.present();
  }

  openStudent(class_s: any){
    console.log(class_s);
  }


}
