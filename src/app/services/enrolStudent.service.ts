import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DepartmentResponse} from '../model/department';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnrolStudentService {

  constructor(private http:HttpClient) { }

  getStudent( ):Observable<DepartmentResponse>
  {
    return this.http.get<DepartmentResponse>(`${environment.Url}/enrolment` );
  }
  getStatus( ):Observable<any>
  {
    return this.http.get (`${environment.Url}/status` ) ;
  }
  enrolStudent(inputName:any):Observable<any>
  {
    return this.http.post(`${environment.Url}/enrolment`,inputName ,{ responseType: 'text' }  );
  }
  deleteStudent(id:number):Observable<any>
  {
    return this.http.post(`${environment.Url}/enrolment/${id}` ,{ responseType: 'text' }  );
  }
  updateStudent(id: number, value: any): Observable<any> {
    return this.http.put(`${environment.Url}enrolment/${id}`, value,{ responseType: 'text' });
  }
  findStudentById(id: number): Observable<any> {
    return this.http.get(`${environment.Url}/student/${id}` );
  }
}
