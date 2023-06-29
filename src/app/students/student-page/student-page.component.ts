import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Students } from 'src/app/models/ui-models/student.model';
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
    }
  
    constructor(
      private readonly studentService: StudentService,
      private readonly route: ActivatedRoute
      ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.studentId = params.get('id');
            if(this.studentId)
                this.studentService.getStudentById(this.studentId)
                .subscribe((successResponse) => {
                    this.student = successResponse;
                }); 
            });
    }

}
