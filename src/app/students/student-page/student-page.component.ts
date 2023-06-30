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
  styleUrls: ['./student-page.component.css'],
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

  isNewStudent: boolean = true;
  header = '';

  displayProfileImageUrl: string = '';

  genderList: Gender[] = [];

  constructor(
    private readonly studentService: StudentService,
    private readonly route: ActivatedRoute,
    private readonly genderService: GenderService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.studentId = params.get('id');
      if (this.studentId) {
        if (this.studentId.toLocaleLowerCase() === 'add'.toLocaleLowerCase()) {
          this.isNewStudent = true;
          this.header = 'Add Student';
          this.setImage();
        } else {
          this.isNewStudent = false;
          this.header = 'Edit Student';
        }

        this.studentService.getStudentById(this.studentId).subscribe(
          (successResponse) => {
            this.student = successResponse;
            this.setImage();
          },
          (errorResponse) => {
            this.setImage();
          }
        );
        this.genderService.getGenders().subscribe((successResponse) => {
          this.genderList = successResponse;
        });
      }
    });
  }

  onUpdate(): void {
    this.studentService.updateStudent(this.student.id, this.student).subscribe(
      (successResponse) => {
        this.snackbar.open('Student updated successfully', undefined, {
          duration: 2000,
        });
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }

  onDelete(): void {
    this.studentService.deleteStudent(this.student.id).subscribe(
      (successResponse) => {
        this.snackbar.open('Student deleted successfully', undefined, {
          duration: 2000,
        });
        //Return to the student list page
        setTimeout(() => {
          this.router.navigate(['/students']);
        }, 2000);
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }

  onAdd(): void {
    this.studentService.addStudent(this.student).subscribe(
      (successResponse) => {
        console.log(successResponse);
        this.snackbar.open('Student added successfully', undefined, {
          duration: 2000,
        });
        //Return to the student list page
        setTimeout(() => {
          this.router.navigate(['/students']);
        }, 2000);
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }

  private setImage(): void {
    if (this.student.profileImageUrl) {
      this.displayProfileImageUrl = this.studentService.getImagePath(
        this.student.profileImageUrl
      );
    } else {
      this.displayProfileImageUrl = 'assets/Default_pfp.svg.png';
    }
  }

  uploadImage(event: any): void {
    if (this.studentId) {
      const file: File = event.target.files[0];
      this.studentService.uploadImage(this.studentId, file).subscribe(
        (successResponse) => {
          this.student.profileImageUrl = successResponse;
          this.setImage();
          this.snackbar.open('Image uploaded successfully', undefined, {
            duration: 2000,
          });
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      );
    }
  }
}
