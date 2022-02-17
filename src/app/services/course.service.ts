import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {CourseResponse} from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http:HttpClient) { }

  getCourse(pageNumber:number = 0, pageSize:number = 20):Observable<any>
  {
    const params =  new HttpParams()
      .append('page',`${pageNumber}`)
      .append('size',`${pageSize}`);
    return this.http.get<any>(`${environment.Url}/course`, {params} ).pipe( catchError( this.errorHandler));
  }

  addCourse(inputName:any):Observable<any>
  {
    return this.http.post(`${environment.Url}/course`,inputName ,{ responseType: 'text' }  ).pipe( catchError( this.errorHandler));
  }
  deleteCourse(id:number):Observable<any>
  {
    return this.http.post(`${environment.Url}/${id}` ,{ responseType: 'text' }  ).pipe( catchError( this.errorHandler));
  }
  updateCourse(id: number, value: any): Observable<any> {
    return this.http.put(`${environment.Url}/${id}`, value,{ responseType: 'text' }).pipe( catchError( this.errorHandler));
  }
  findCourseById(id: number): Observable<any> {
    return this.http.get(`${environment.Url}/course/${id}` ).pipe( catchError( this.errorHandler));
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

