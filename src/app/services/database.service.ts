import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db: SQLiteDBConnection;

  constructor() {
    this.initializeDatabase();
  }

  async initializeDatabase() {
    try {
      const dbName = 'class_management';
      const dbVersion = 1;
      const sqlite = CapacitorSQLite;
      const isNative = Capacitor.isNativePlatform();

      if (isNative) {
        const ret = await sqlite.createConnection(dbName, false, 'no-encryption', dbVersion);
        this.db = ret.result;
        await this.db.open();
      } else {
        const ret = await sqlite.createConnection(dbName, false, 'no-encryption', dbVersion);
        this.db = ret.result;
        await this.db.open();
      }

      await this.db.execute(`
        CREATE TABLE IF NOT EXISTS classes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT
        )`);
      await this.db.execute(`
        CREATE TABLE IF NOT EXISTS students (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          class_id INTEGER,
          name TEXT,
          FOREIGN KEY (class_id) REFERENCES classes(id)
        )`);
      await this.db.execute(`
        CREATE TABLE IF NOT EXISTS assignments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          class_id INTEGER,
          title TEXT,
          FOREIGN KEY (class_id) REFERENCES classes(id)
        )`);
      await this.db.execute(`
        CREATE TABLE IF NOT EXISTS marks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          student_id INTEGER,
          assignment_id INTEGER,
          marks INTEGER,
          FOREIGN KEY (student_id) REFERENCES students(id),
          FOREIGN KEY (assignment_id) REFERENCES assignments(id)
        )`);
    } catch (error) {
      console.error('Unable to initialize database', error);
    }
  }

  // Class Methods
  async addClass(name: string) {
    const sql = `INSERT INTO classes (name) VALUES (?)`;
    const result = await this.db.run(sql, [name]);
    return result.changes.lastId;
  }

  async getClasses() {
    const sql = `SELECT * FROM classes`;
    const result = await this.db.query(sql);
    return result.values;
  }

  // Student Methods
  async addStudent(classId: number, name: string) {
    const sql = `INSERT INTO students (class_id, name) VALUES (?, ?)`;
    const result = await this.db.run(sql, [classId, name]);
    return result.changes.lastId;
  }

  async getStudents(classId: number) {
    const sql = `SELECT * FROM students WHERE class_id = ?`;
    const result = await this.db.query(sql, [classId]);
    return result.values;
  }

  // Assignment Methods
  async addAssignment(classId: number, title: string) {
    const sql = `INSERT INTO assignments (class_id, title) VALUES (?, ?)`;
    const result = await this.db.run(sql, [classId, title]);
    return result.changes.lastId;
  }

  async getAssignments(classId: number) {
    const sql = `SELECT * FROM assignments WHERE class_id = ?`;
    const result = await this.db.query(sql, [classId]);
    return result.values;
  }

  async assignMarks(studentId: number, assignmentId: number, marks: number) {
    const sql = `INSERT INTO marks (student_id, assignment_id, marks) VALUES (?, ?, ?)`;
    const result = await this.db.run(sql, [studentId, assignmentId, marks]);
    return result.changes.lastId;
  }

  async getMarks(assignmentId: number) {
    const sql = `SELECT * FROM marks WHERE assignment_id = ?`;
    const result = await this.db.query(sql, [assignmentId]);
    return result.values;
  }
}
