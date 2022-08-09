import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Class } from './../models/class';
import { Student } from './../models/student';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  getStudent() {
    throw new Error('Method not implemented.');
  }

  // Classes$=new  BehaviorSubject<Class[]>([]);

  private base = 'https://localhost:44351/api/Classes/';
  private studentId!: number;
  constructor(private http: HttpClient) {}

  getClassesList(): Observable<Class[]> {
    return this.http.get<Class[]>(`${this.base}GetClassesList`);
  }

  saveStudent(student: Student): Observable<any> {
    debugger;
    return this.http.post(`${this.base}SaveStudent`, student);
  }

  getStudentsList(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.base}GetStudentsList`);
  }
  DeleteStudent(student: Student): Observable<any> {
    return this.http.delete(`${this.base}DeleteStudent/` + student.Id);
  }

  UpdateStudentDetails(student: Student): Observable<any> {
    this.studentId = student.Id;
    return this.http.put(
      `${this.base}UpdateStudentDetails/` + this.studentId,
      student
    );
  }
}
