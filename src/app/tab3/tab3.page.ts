import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon,
  IonLabel, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonItem,
IonList, IonRefresher, IonRefresherContent, IonButton } from '@ionic/angular/standalone';

import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { SupabaseService } from '../services/supabase.service';
import { AddAssignmentModalComponent } from '../add-assignment-modal/add-assignment-modal.component';
import Assignment from '../types/Assignment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  providers: [ModalController],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,
    ExploreContainerComponent, IonFab, IonFabButton, IonIcon, IonLabel, IonCard,
    IonCardContent,IonCardHeader,IonCardTitle, IonItem, IonList, IonRefresher,
     IonRefresherContent, IonButton ],
})
export class Tab3Page implements OnInit {
  assignments: any[] = [];

  constructor(private supabaseService: SupabaseService, 
    private modalController: ModalController,
  private router: Router) {}


  navigateToViewAssignment (){
  }

  async ngOnInit() {
    this.assignments = await this.supabaseService.getAssignments();
    console.log('assignments',this.assignments)
  }

  async refreshAssignments(event: any) {
    this.assignments = await this.supabaseService.getAssignments();
    event.target.complete();
  }

  async openAddAssignmentModal() {
    const modal = await this.modalController.create({
      component: AddAssignmentModalComponent,
    });

    modal.onDidDismiss().then(async (result) => {
      if (result.data) {
        // await this.supabaseService.addAssignment(result.data);
        this.assignments = await this.supabaseService.getAssignments();
      }
    });

    await modal.present();
  }

  openAssignment(assignment: Assignment){
    this.router.navigate(['tabs/assignments', assignment.id])
  }

  async deleteAssignment(assignment: Assignment){
    let isDeleted = await this.supabaseService.deleteAssignment(assignment)
    if(isDeleted){
      this.assignments = await this.supabaseService.getAssignments();

    }
  }


}

