import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentPageComponent } from './students/student-page/student-page.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'students',
    component:StudentsComponent
  },
  {
    path:'students/:id',
    component:StudentPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
