import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DepartmentResponse} from '../model/department';
import {environment} from '../../environments/environment';
import {StudentResponse} from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }
  getStudent(pageNumber:number = 1,pageSize:number = 10):Observable<StudentResponse>
  {
    const params =  new HttpParams()
      .append('pageNumber',`${pageNumber}`)
      .append('pageSize',`${pageSize}`);
    return this.http.get<StudentResponse>(`${environment.Url}/student`, {params} );
  }

  addStudent(inputName:any):Observable<any>
  {
    return this.http.post(`${environment.Url}/auth/signup`,inputName ,{ responseType: 'text' }  );
  }
  deleteStudent(id:number):Observable<any>
  {
    return this.http.post(`${environment.Url}/student/${id}` ,{ responseType: 'text' }  );
  }
  updateStudent(id: number, value: any): Observable<any> {
    return this.http.put(`${environment.Url}student/${id}`, value,{ responseType: 'text' });
  }
  findStudentById(id: number): Observable<any> {
    return this.http.get(`${environment.Url}/student/${id}` );
  }
}
