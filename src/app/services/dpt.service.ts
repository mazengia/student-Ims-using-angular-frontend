import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DptService {
  constructor(private http:HttpClient) { }

  getDpt( ):Observable<any>
  {
    return this.http.get (`${environment.Url}/department-program-type` ).pipe( catchError( this.errorHandler));
  }
  addDpt(inputName:any):Observable<any>
  {
    return this.http.post(`${environment.Url}/department-program-type`,inputName ,{ responseType: 'text' }  ).pipe( catchError( this.errorHandler));
  }
  deleteDpt(id:number):Observable<any>
  {
    return this.http.post(`${environment.Url}/department-program-type/${id}` ,{ responseType: 'text' }  ).pipe( catchError( this.errorHandler));
  }
  updateDpt(id: number, value: any): Observable<any> {
    return this.http.put(`${environment.Url}/department-program-type/${id}`, value,{ responseType: 'text' }).pipe( catchError( this.errorHandler));
  }
  findDptById(id: number): Observable<any> {
    return this.http.get(`${environment.Url}/department-program-type/${id}` ).pipe( catchError( this.errorHandler));
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

