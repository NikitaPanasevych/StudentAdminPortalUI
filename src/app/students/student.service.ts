import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Students } from '../models/api-models/student.model';
import { updateStudentRequest } from '../models/api-models/updateStudentRequest.models';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl = 'https://localhost:7108';

  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<Students[]> {
    return this.httpClient.get<Students[]>(this.baseApiUrl + '/students');
  }

  getStudentById(id: string): Observable<Students> {
    return this.httpClient.get<Students>(this.baseApiUrl + '/students/' + id);
  }

  updateStudent(studentId: string, studentRequest: Students): Observable<Students>{
    const updateStudentRequest: updateStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress,
    }
    return this.httpClient.put<Students>(this.baseApiUrl + '/students/' + studentId, updateStudentRequest);
  }
}
