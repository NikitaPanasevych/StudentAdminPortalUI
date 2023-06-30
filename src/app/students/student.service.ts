import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { AddStudentRequest } from '../models/api-models/addStudentRequest.model';
import { Students } from '../models/api-models/student.model';
import { updateStudentRequest } from '../models/api-models/updateStudentRequest.models';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseApiUrl = environment.baseApiUrl;

  constructor(private httpClient: HttpClient) {}

  getStudents(): Observable<Students[]> {
    return this.httpClient.get<Students[]>(this.baseApiUrl + '/students');
  }

  getStudentById(id: string): Observable<Students> {
    return this.httpClient.get<Students>(this.baseApiUrl + '/students/' + id);
  }

  updateStudent(
    studentId: string,
    studentRequest: Students
  ): Observable<Students> {
    const updateStudentRequest: updateStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress,
    };
    return this.httpClient.put<Students>(
      this.baseApiUrl + '/students/' + studentId,
      updateStudentRequest
    );
  }

  deleteStudent(studentId: string): Observable<Students> {
    return this.httpClient.delete<Students>(
      this.baseApiUrl + '/students/' + studentId
    );
  }

  addStudent(studentRequest: Students): Observable<Students> {
    const addStudentRequest: AddStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress,
    };
    return this.httpClient.post<Students>(
      this.baseApiUrl + '/students/add',
      addStudentRequest
    );
  }

  uploadImage(studentId: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('profileImage', file);
    return this.httpClient.post<any>(
      this.baseApiUrl + '/students/' + studentId + '/upload-image',
      formData,
      {
        responseType: 'text' as 'json',
      }
    );
  }

  getImagePath(relativePath: string): string {
    return `${this.baseApiUrl}/${relativePath}`;
  }
}
