import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon,
  IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem,
IonList, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';

import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { SupabaseService } from '../services/supabase.service';
import { AddClassModalComponent } from '../add-class-modal/add-class-modal.component';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  providers: [ModalController],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,
    ExploreContainerComponent, IonFab, IonFabButton, IonIcon, IonLabel, IonCard,
    IonCardContent,IonCardHeader,IonCardTitle, IonItem, IonList, IonRefresher,
     IonRefresherContent ],
})
export class Tab1Page implements OnInit {
  classes: any[] = [];

  constructor(private supabaseService: SupabaseService, private modalController: ModalController) {}


  navigateToAddToClassPage (){
  }

  async ngOnInit() {
    this.classes = await this.supabaseService.getClasses();
    console.log('myclasses',this.classes)
  }

  async refreshClasses(event: any) {
    this.classes = await this.supabaseService.getClasses();
    event.target.complete();
  }

  async openAddClassModal() {
    const modal = await this.modalController.create({
      component: AddClassModalComponent,
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data) {
        await this.supabaseService.addClass(result.data);
        this.classes = await this.supabaseService.getClasses();
      }
    });

    await modal.present();
  }

  openClass(class_s: any){
    console.log(class_s);
  }


}
