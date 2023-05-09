import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {Department, DepartmentResponse} from '../model/department';
import {catchError} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http:HttpClient) { }


  getDepartment(pageNumber:number = 0, pageSize:number = 20):Observable<DepartmentResponse>
  {
    const params =  new HttpParams()
      .append('page',`${pageNumber}`)
      .append('size',`${pageSize}`);
    return this.http.get<DepartmentResponse>(`${environment.Url}/department`, {params} ).pipe( catchError( this.errorHandler));
  }

  addDepartment(data:Department):Observable<Department>
  {
    return this.http.post<Department>(`${environment.Url}/department`,data );
  }
  deleteDepartment(departmentId:number):Observable<Department>
  {
    return this.http.delete<Department>(`${environment.Url}/department/${departmentId}`  );
  }
  updateDepartment(departmentId: number, department: Department): Observable<Department> {
    return this.http.put<Department>(`${environment.Url}/department/${departmentId}`, department );
  }
  findDepartmentById(id: number): Observable<DepartmentResponse> {
    return this.http.get<DepartmentResponse>(`${environment.Url}/department/${id}` );
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
}
