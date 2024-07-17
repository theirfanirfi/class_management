// src/app/services/supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import ClassType from '../types/ClassType';
import Student from '../types/Student';
import Assignment from '../types/Assignment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient('https://zogppbiqylqtyednzdlr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvZ3BwYmlxeWxxdHllZG56ZGxyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA3MDc1OTMsImV4cCI6MjAzNjI4MzU5M30.j31SEv0PmVz2apAv5Qdy6aML_AELC93lkdcbYmFbH_M');
  // console.log(this.supabase);
  }

  async getClasses() {
    let teacher_id = 1;
    const { data, error } = await this.supabase.from('classes').select().eq('teacher_id',teacher_id)
    if (error) {
      console.error('Error fetching classes:', error);
      return [];
    }

    console.log('data', data);
    console.log('error', error);
    return data;
  }

  async addClass(newClass: ClassType) {
    let teacher_id = 1;
    // newClass['teacher_id'] = teacher_id;

    const { data, error } = await this.supabase.from('classes').insert([newClass]).select();
    if (error) {
      console.error('Error adding class:', error);
      return null;
    }
    return data;
  }


  async getStudents() {
    const { data, error } = await this.supabase.from('students').select('id, student_name, classes(class_title)')
    if (error) {
      console.error('Error fetching students:', error);
      return [];
    }

    console.log('data', data);
    console.log('error', error);
    return data;
  }

  async addStudent(newStudent: Student) {
    const { data, error } = await this.supabase.from('students').insert([newStudent]).select();
    if (error) {
      console.error('Error adding student:', error);
      return null;
    }
    return data;
  }


  async getAssignments() {
    let teacher_id = 1
    const { data, error } = await this.supabase.from('assignments').select('id, assignment_title, classes(class_title)').eq('teacher_id', teacher_id)
    if (error) {
      console.error('Error fetching assignments:', error);
      return [];
    }

    console.log('data', data);
    console.log('error', error);
    return data;
  }

  async addAssignment(newAssignment: Assignment) {
    const { data, error } = await this.supabase.from('assignments').insert([newAssignment]).select();
    if (error) {
      console.error('Error adding assignment:', error);
      return null;
    }
    return data;
  }
}
