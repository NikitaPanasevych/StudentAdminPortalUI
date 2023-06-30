import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { Students } from 'src/app/models/ui-models/student.model';
import { GenderService } from 'src/app/services/gender.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent {

    studentId: string | null | undefined;
    student: Students = {
        id: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: '',
        mobile: 0,
        profileImageUrl: '',
        genderId: '',
        gender: { id: '', description: '' },
        address: { id: '', physicalAddress: '', postalAddress: '' },
    };

    genderList : Gender[] = []
  
    constructor(
      private readonly studentService: StudentService,
      private readonly route: ActivatedRoute,
      private readonly genderService: GenderService,
      private snackbar: MatSnackBar,
      private router: Router,
      ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.studentId = params.get('id');
            if(this.studentId){
                this.studentService.getStudentById(this.studentId)
                .subscribe((successResponse) => {
                    this.student = successResponse;
                })
                this.genderService.getGenders()
                .subscribe((successResponse) => {
                    this.genderList = successResponse;
                })
            };
        }
    )};

    onUpdate(): void {
        this.studentService.updateStudent(this.student.id, this.student)
            .subscribe((successResponse) => {
                this.snackbar.open("Student updated successfully", undefined, {
                    duration: 2000,
                });
            },
            (errorResponse) => {
                console.log(errorResponse);
            }
        );
    }

    onDelete(): void {
        this.studentService.deleteStudent(this.student.id)
            .subscribe((successResponse) => {
                this.snackbar.open("Student deleted successfully", undefined, {
                    duration: 2000,
                });
                //Return to the student list page
                setTimeout(() => {
                    this.router.navigate(['/students'])
                }, 2000);
            },
            (errorResponse) => {
                console.log(errorResponse);
            }
        );
    }

}
