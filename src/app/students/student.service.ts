import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Students } from '../models/api-models/student.model';

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
}
