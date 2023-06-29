import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Students } from '../models/ui-models/student.model';
import { StudentService } from './student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Students[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile', 'gender', "edit"];
  dataSource: MatTableDataSource<Students> = new MatTableDataSource<Students>();

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  filterString: string = '';


  constructor (private studentService: StudentService) {}

  ngOnInit(): void {
    //Fetch data from API
    this.studentService.getStudents()
      .subscribe(
        (successResponse) => {
          this.students = successResponse;
          this.dataSource = new MatTableDataSource<Students>(this.students);
          if(this.matPaginator){
            this.dataSource.paginator = this.matPaginator;
          }
          if(this.matSort){
            this.dataSource.sort = this.matSort;
          }
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      );
  }

  filterTable() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }
}
