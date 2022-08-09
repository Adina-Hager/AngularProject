import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/student';
import { ClassesService } from './../classes.service';
import { Router } from '@angular/router';
import { Class } from 'src/app/models/class';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css'],
})
export class StudentsListComponent implements OnInit {
  filterB = false;

  classList!: Class[];

  myStudentList: Student[] = [];
  sortStudent: Student[] = [];
  selectedValue = 0;

  constructor(private cs: ClassesService, private route: Router) {}

  ngOnInit(): void {
    // קבלת נתונים
    this.cs.getStudentsList().subscribe(
      (res) => {
        this.myStudentList = res;
      },
      (err) => {
        console.log(err);
      }
    );

    this.cs.getStudentsList().subscribe((res) => {
      this.sortStudent = res;
    });

    this.cs.getClassesList().subscribe(
      (res) => {
        this.classList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  // שליחה לעריכה
  editStudent(student: Student): void {
    this.route.navigate(['/shell', student.Id]);
  }
  // שליחה למחיקה
  deleteStudent(student: Student): void {
    this.cs.DeleteStudent(student).subscribe(
      (res) => {
        alert('הנתונים עודכנו בהצלחה');
        this.ngOnInit();
      },
      (err) => {
        alert('error');
      }
    );
  }

  // סינון התלמידים לפי חוג
  filter(): void {
    if (this.selectedValue != 0) {
      this.sortStudent = [];
      for (let index = 0; index < this.myStudentList.length; index++) {
        if (this.myStudentList[index].ClassCode == this.selectedValue)
          this.sortStudent.push(this.myStudentList[index]);
      }
    } else {
      this.sortStudent = this.myStudentList;
    }
  }
}
