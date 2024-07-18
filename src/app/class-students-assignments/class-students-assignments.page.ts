
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';


@Component({
  selector: 'app-class-students-assignments',
  templateUrl: './class-students-assignments.page.html',
  styleUrls: ['./class-students-assignments.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent]
})
export class ClassStudentsAssignmentsPage implements OnInit {
  class: any = '';
  class_title = '';
  constructor(private route: ActivatedRoute,
     private supabase: SupabaseService,
    private router: Router) { }

  async ngOnInit() {
    let params = this.route.snapshot.params
    let class_id = params['id']
    this.class = await this.supabase.getClassById(class_id)
    if(this.class){
      this.class = this.class[0];
      this.class_title = this.class.class_title
    }


  }

  openStudents(class_s: any){
    this.router.navigate(['/tabs/class_students', class_s.id]);
  }
openAssignments(class_s: any){
  this.router.navigate(['/tabs/class_assignments', class_s.id]);

}           
}

