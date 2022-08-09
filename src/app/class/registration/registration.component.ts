import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Student } from './../../models/student';
import { Class } from './../../models/class';
import { ClassesService } from './../classes.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  @Input()
  student!: Student;
  myForm!: FormGroup;
  color = 'yellow';
  ClassesList!: Class[];
  className!: string;
  month!: number;
  class!: number;
  price = 0;
  classFlag = false;
  monthsFlag = false;
  item!: number;
  flag: boolean = false;
  code!: number;
  c: Class = { Code: 122, Name: 'vcg', Price: 122 };
  myControl = new FormControl('', Validators.required);
  filteredOptions!: Observable<Class[]>;
  options!: Class[];

  constructor(
    private fb: FormBuilder,
    private cs: ClassesService,
    private route: Router
  ) {}

  ngOnInit() {
    //מקבל נתוני החוגים מהDATA
    this.cs.getClassesList().subscribe(
      (res) => {
        this.ClassesList = res;
      },
      (err) => {
        console.log(err);
      }
    );
    ///מקבל נתוני החוגים מהDATA
    this.cs.getClassesList().subscribe(
      (res: any) => {
        this.options = res;
      },
      (err) => {
        console.log(err);
      }
    );
    //סינון של auto complete
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.options.slice()))
    );
    //הכנסת ערך החוג לתיבת הSELECT
    if (this.filteredOptions == null) this.myControl.setValue(this.c);
    // יצירת הטופס והולידציות
    this.myForm = this.fb.group({
      Id: [
        ,
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),
          Validators.pattern('[0-9]*'),
        ],
      ],
      Name: [
        ,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(24),
        ],
      ],
      Phone: [
        ,
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(10),
          Validators.pattern('[0-9]*'),
        ],
      ],
      Address: [
        ,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      ],
      Email: [, [Validators.required, Validators.email]],
      Age: [
        ,
        [
          Validators.required,
          Validators.max(99),
          Validators.min(3),
          Validators.pattern('[0-9]*'),
        ],
      ],
      ClassCode: [, []],
      MonthNumber: [, [Validators.required]],
      Price: [],
      ClassName: [],
    });
    this.myForm.get('Price')?.disable();
    // בדיקה אם הוא במצב של עריכה
    if (this.student != null) {
      this.flag = true;
      //הכנסת ערכי התלמיד לטופס
      this.myForm.setValue(this.student);
      // במצב עריכה הכנסת נתוני החוג לטופס
      if (this.student != undefined) {
        this.c.Code = this.student.ClassCode;
        this.c.Name = this.student.ClassName;

        this.myControl.setValue(this.c);
      }
    }
  }

  valMonth(): void {
    //חישוב מחיר
    this.monthsFlag = true;
    if (
      (this.monthsFlag === true && this.classFlag === true) ||
      this.flag == true
    )
      this.calcPrice();
  }

  valClasses(): void {
    //חישוב מחיר
    this.classFlag = true;
    if (
      (this.monthsFlag === true && this.classFlag === true) ||
      this.flag == true
    )
      this.calcPrice();
  }
  calcPrice(): void {
    //חישוב מחיר
    this.class = this.myControl.value.Code;
    for (let i = 0; i < this.ClassesList.length; i++) {
      if (this.ClassesList[i].Code == this.class) {
        this.item = this.ClassesList[i].Price;
        this.className = this.ClassesList[i].Name;
        break;
      }
    }
    let p = parseInt(this.myForm.get('MonthNumber')?.value);
    switch (p) {
      case 1:
        this.price = this.item;
        break;
      case 3:
        this.price = this.myForm.get('MonthNumber')?.value * this.item * 0.95;
        break;
      case 6:
        this.price = this.myForm.get('MonthNumber')?.value * this.item * 0.85;
        break;
      case 12:
        this.price = this.myForm.get('MonthNumber')?.value * this.item * 0.8;
        break;
    }

    this.myForm.get('Price')?.setValue(this.price);
  }
  //AUTO COMPLETE
  displayFn(user: Class): string {
    return user && user.Name ? user.Name : '';
  }
  private _filter(name: string): Class[] {
    const filterValue = name.toLowerCase();
    return this.options.filter((option) =>
      option.Name.toLowerCase().includes(filterValue)
    );
  }

  // onsave
  onsubmit(): void {
    let Id: number = parseInt(this.myForm.get('Id')?.value);
    let Name: string = this.myForm.get('Name')?.value;
    let MonthNumber: number = parseInt(this.myForm.get('MonthNumber')?.value);
    let Phone: string = this.myForm.get('Phone')?.value;
    let Address: string = this.myForm.get('Address')?.value;
    let Age: number = parseInt(this.myForm.get('Age')?.value);
    let ClassCode: number = parseInt(this.myControl.value.Code);
    let Email: string = this.myForm.get('Email')?.value;
    let Price: number = parseInt(this.myForm.get('Price')?.value);
    let ClassName!: string;
    let studentp: Student = {
      Id,
      Name,
      Phone,
      Address,
      Email,
      Age,
      ClassCode,
      MonthNumber,
      Price,
      ClassName,
    };

    if (isNaN(studentp.ClassCode)) {
      alert('Select a class from the list only');
    } else if (this.flag == true) {
      this.update(studentp);
    } else {
      this.cs.saveStudent(studentp).subscribe(
        (res) => {
          alert('Data saved successfully');
          this.route.navigateByUrl('/Students-List');
          this.classFlag = false;
          this.monthsFlag = false;
        },
        (err) => {
          alert('error');
        }
      );
    }
  }
  //update
  update(student: Student): void {
    this.flag = false;
    //  student.ClassCode = this.myControl.value.Code;
    this.cs.UpdateStudentDetails(student).subscribe(
      (res) => {
        alert('The data has been updated successfully');
        this.route.navigateByUrl('/Students-List');
        this.classFlag = false;
        this.monthsFlag = false;
      },
      (err) => {
        alert('error');
      }
    );
  }
}
