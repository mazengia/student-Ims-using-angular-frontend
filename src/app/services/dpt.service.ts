import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Dpt, DptResponse} from "../model/dpt";
import {StudentResponse} from "../model/student";

@Injectable({
  providedIn: 'root'
})
export class DptService {
  constructor(private http:HttpClient) { }

  getDpt(pageNumber: number = 1, pageSize: number = 10 ):Observable<DptResponse>
  {const params = new HttpParams()
    .append('page', `${pageNumber}`)
    .append('size', `${pageSize}`);
    return this.http.get<DptResponse>(`${environment.Url}/dpt`,{params} ).pipe( catchError( this.errorHandler));
  }

  addDpt(dpt:Dpt):Observable<Dpt>
  {
    return this.http.post<Dpt>(`${environment.Url}/dpt`,dpt  ).pipe( catchError( this.errorHandler));
  }
  deleteDpt(id:number):Observable<Dpt>
  {
    return this.http.delete<Dpt>(`${environment.Url}/dpt/${id}`    ).pipe( catchError( this.errorHandler));
  }
  updateDpt(id: number, dpt: Dpt): Observable<Dpt> {
    return this.http.put<Dpt>(`${environment.Url}/dpt/${id}`, dpt ).pipe( catchError( this.errorHandler));
  }
  findDptById(id: number): Observable<DptResponse> {
    return this.http.get<DptResponse>(`${environment.Url}/dpt/${id}` ).pipe( catchError( this.errorHandler));
  }

  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  getDptByDepartmentId(pageNumber: number = 1, pageSize: number = 10,departmentId: any ):Observable<DptResponse>
  {const params = new HttpParams()
    .append('page', `${pageNumber}`)
    .append('size', `${pageSize}`);
    return this.http.get<DptResponse>(`${environment.Url}/dpt/department/${departmentId}`,{params} ).pipe( catchError( this.errorHandler));
  }
  getStudentGroupByDptId(pageNumber: number = 1, pageSize: number = 10,dptId: any ):Observable<StudentResponse>
  {const params = new HttpParams()
    .append('page', `${pageNumber}`)
    .append('size', `${pageSize}`);
    return this.http.get<StudentResponse>(`${environment.Url}/student-enroll/dpt/${dptId}`,{params} ).pipe( catchError( this.errorHandler));
  }

}

