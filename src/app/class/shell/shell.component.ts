import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ClassesService } from '../classes.service';
import { Student } from './../../models/student';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css'],
})
export class ShellComponent implements OnInit {
  studenti!: Student[];
  data!: number;
  selectedStudent!: any;

  constructor(private activeR: ActivatedRoute, private cs: ClassesService) {
    //קבלת נתונים מהנתב
    this.activeR.params.subscribe((p) => {
      this.data = p['student'];
    });
  }

  ngOnInit(): void {
    // שמירת האובייקט שהתז שלו זהה לתז שנשלח
    this.cs.getStudentsList().subscribe((res) => {
      this.studenti = res;
      if (this.studenti != null)
        this.studenti.forEach((element) => {
          if (element.Id == this.data) this.selectedStudent = element;
        });
    });
  }
}
