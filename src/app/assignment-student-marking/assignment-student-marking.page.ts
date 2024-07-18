import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon,
   IonInput, IonLabel, IonItem, IonList, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';
import Assignment from '../types/Assignment';

@Component({
  selector: 'app-assignment-student-marking',
  templateUrl: './assignment-student-marking.page.html',
  styleUrls: ['./assignment-student-marking.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonFab, IonFabButton, IonIcon, IonInput, IonLabel, IonItem, IonList,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonRefresher, IonRefresherContent
  ]
})
export class AssignmentStudentMarkingPage implements OnInit {
  assignment_title = 'Assignment'
  assignment: any;
  students: any[] = [];
  showButton = true
  constructor(private route: ActivatedRoute, private supabase: SupabaseService) { }

  async ngOnInit() {
    console.log(this.route.snapshot.params['id'])
     this.assignment = await this.supabase.getAssignment(Number(this.route.snapshot.params['id']))
     this.assignment = this.assignment[0]
     this.students = await this.supabase.getStudentsByClassId(this.assignment.class_id);
    //  console.log('this.students', this.students)
    // console.log(this.assignment);
  }

}
