import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon,
  IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem,
IonList, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { SupabaseService } from '../services/supabase.service';
import { AddStudentModalComponent } from '../add-student-modal/add-student-modal.component';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-tab2',
  templateUrl: './class-students.page.html',
  styleUrls: ['../tab2/tab2.page.scss'],
  standalone: true,
  providers: [ModalController],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,
    ExploreContainerComponent, IonFab, IonFabButton, IonIcon, IonLabel, IonCard,
    IonCardContent,IonCardHeader,IonCardTitle, IonItem, IonList, IonRefresher,
     IonRefresherContent ],
})
export class ClassStudentsPage implements OnInit {
  students: any[] = [];
  class: any = '';
  class_title = ''

  constructor(private supabaseService: SupabaseService, private modalController: ModalController,
    private router: Router, private route: ActivatedRoute
  ) {}


  navigateToAddToClassPage (){
  }

  async ngOnInit() {
    let params = this.route.snapshot.params
    let class_id = params['id']
    this.class = await this.supabaseService.getClassById(class_id)
    this.students = await this.supabaseService.getStudentsByClassId(class_id)
    if(this.class){
      this.class = this.class[0];
      this.class_title = this.class.class_title
    }

    console.log(this.students);


  }

  async refreshStudents(event: any) {
    this.students = await this.supabaseService.getStudentsByClassId(this.class.id)
    event.target.complete();
  }

  async openStudentModal() {
    const modal = await this.modalController.create({
      component: AddStudentModalComponent,
    });

    modal.onDidDismiss().then(async (result) => {
      // if (result.data) {
      //   await this.supabaseService.addClass(result.data);
        this.students = await this.supabaseService.getStudentsByClassId(this.class.id)
      // }
    });

    await modal.present();
  }

  openStudent(class_s: any){
    console.log(class_s);
  }


}
