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
  showButton = false
  dirtyArray:any = []
  dirtyArrayUpdate:any = []
  dirtyArrayInsert:any = []
  constructor(private route: ActivatedRoute, private supabase: SupabaseService) { }

  fetchStudents = async () => {
    this.students = [];
    console.log(this.route.snapshot.params['id'])
     this.assignment = await this.supabase.getAssignment(Number(this.route.snapshot.params['id']))
     this.assignment = this.assignment[0]
     let students = await this.supabase.getStudentsByClassId(this.assignment.class_id);
     for(let student of students){
      let studentMarks = await this.supabase.getStudentMarkDetailsForAssignment(this.assignment.id, student.id);
      if(studentMarks){
      this.students.push({
        student_name: student.student_name,
        assignment_id: studentMarks.assignment_id,
        marks: studentMarks.marks,
        id: studentMarks.id,
        class_id: this.assignment.class_id,
        student_id: student.id,
      })
     }else {
      this.students.push({
        student_name: student.student_name,
        assignment_id: this.assignment.id,
        marks: 0,
        id: null,
        class_id: this.assignment.class_id,
        student_id: student.id,
      })
     }
    }
  }
  async ngOnInit() {
    this.fetchStudents();
  }

  changeStudentMarks(event: any, student:any){
    student.marks = event.target.value
    let found = false;
    for(let dirty of this.dirtyArray){
      if(dirty.student_id == student.student_id){
        dirty.marks = event.target.value;
        found = true;
        break;
      }
    }
    
    if(!found){

      this.dirtyArray.push({
        id: student.id,
        student_id: student.student_id,
        class_id: student.class_id,
        assignment_id: student.assignment_id,
        marks: student.marks
      });
    }

    console.log(this.dirtyArray);
    if(this.dirtyArray.length > 0 ){
      this.showButton = true;
    }

    // console.log(event.target.value, student.id, student.student_name);
  }

  async saveChanges(){
    let student_with_out_ids
    console.log(this.dirtyArray)
    alert('Please wait, marks are being saved. You will be notified when the changes are saved. Stay on the page');
    let dirtyArrayInsert = [];
    // let dirtyArrayUpdate = [];
    for(let std of this.dirtyArray){
      if(std.id == null){
        delete std['id']
      }

      dirtyArrayInsert.push(std);

      
      // else {
      //   dirtyArrayUpdate.push(std);
      // }
    }
    let dataInsert:any = 0;
    let dataUpdate:any = 0;

    // if(dirtyArrayInsert.length > 0) {
    //   console.log("dirtyArrayInsert", dirtyArrayInsert);
    // dataInsert = await this.supabase.assignmentMassInsert(dirtyArrayInsert)

    // }
    if(dirtyArrayInsert.length > 0) {
      // console.log("dirtyArrayUpdate", dirtyArrayUpdate);
      dataUpdate = await this.supabase.assignmentMassUpdate(dirtyArrayInsert)

    }
    
    this.dirtyArray = []
    dirtyArrayInsert = []
    // dirtyArrayUpdate = []
console.log("dirtyArray", this.dirtyArray);

    alert('Changes saved successfully');
    this.fetchStudents();

    
  }

  async refreshMarks(event: any) {
    await this.ngOnInit()
    event.target.complete();
  }

}
