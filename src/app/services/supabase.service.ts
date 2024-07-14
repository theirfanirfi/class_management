// src/app/services/supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

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
    const { data, error } = await this.supabase.from('classes').select()
    if (error) {
      console.error('Error fetching classes:', error);
      return [];
    }

    console.log('data', data);
    console.log('error', error);
    return data;
  }

  async addClass(newClass: { class_title: string; class_description: string, time: string }) {
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

  async addStudent(newStudent: { student_name: string; class_id: Number }) {
    const { data, error } = await this.supabase.from('students').insert([newStudent]).select();
    if (error) {
      console.error('Error adding student:', error);
      return null;
    }
    return data;
  }
}
