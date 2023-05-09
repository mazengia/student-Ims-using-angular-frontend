import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DepartmentResponse} from '../model/department';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnrolStudentService {

  constructor(private http:HttpClient) { }

  getEnrolledStudent( ):Observable<any>
  {
    return this.http.get<any>(`${environment.Url}/student-enroll` );
  }
  getStatus( ):Observable<any>
  {
    return this.http.get (`${environment.Url}/status` ) ;
  }
  getSemesters( ):Observable<any>
  {
    return this.http.get (`${environment.Url}/semesters` ) ;
  }
  loadCertificationYear( ):Observable<any>
  {
    return this.http.get (`${environment.Url}/batches` ) ;
  }
  loadSections( ):Observable<any>
  {
    return this.http.get (`${environment.Url}/Sections` ) ;
  }

  enrolStudent(studentData:any):Observable<any>
  {
    return this.http.post(`${environment.Url}/student-enroll`,studentData ,{ responseType: 'text' }  );
  }
  deleteStudent(id:number):Observable<any>
  {
    return this.http.post(`${environment.Url}/student-enroll/${id}` ,{ responseType: 'text' }  );
  }
  updateStudent(id: number, value: any): Observable<any> {
    return this.http.put(`${environment.Url}/student-enroll/${id}`, value,{ responseType: 'text' });
  }
  findStudentById(id: number): Observable<any> {
    return this.http.get(`${environment.Url}/student-enroll/${id}` );
  }
}
