import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassesService } from './classes.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { StudentsListComponent } from './students-list/students-list.component';
import { HighlightDirective } from '../Directives/high-light.directive';
import { ShellComponent } from './shell/shell.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
const ClassRoutes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'Students-List', component: StudentsListComponent },
  { path: 'shell/:student', component: ShellComponent },
];

@NgModule({
  declarations: [
    RegistrationComponent,
    HighlightDirective,
    ShellComponent,
    StudentsListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ClassRoutes),
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    BrowserModule,
    MatAutocompleteModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [RegistrationComponent, StudentsListComponent],
  providers: [ClassesService],
})
export class ClassModule {}
