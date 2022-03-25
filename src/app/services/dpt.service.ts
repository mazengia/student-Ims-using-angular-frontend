import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {RolesResponse} from "../model/Roles";
import {Dpt, DptResponse} from "../model/dpt";

@Injectable({
  providedIn: 'root'
})
export class DptService {
  constructor(private http:HttpClient) { }

  getDpt(pageNumber: number = 1, pageSize: number = 10 ):Observable<DptResponse>
  {const params = new HttpParams()
    .append('page', `${pageNumber}`)
    .append('size', `${pageSize}`);
    return this.http.get<DptResponse>(`${environment.Url}/department-program-type`,{params} ).pipe( catchError( this.errorHandler));
  }

  addDpt(dpt:Dpt):Observable<Dpt>
  {
    return this.http.post<Dpt>(`${environment.Url}/department-program-type`,dpt  ).pipe( catchError( this.errorHandler));
  }
  deleteDpt(id:number):Observable<Dpt>
  {
    return this.http.delete<Dpt>(`${environment.Url}/department-program-type/${id}`    ).pipe( catchError( this.errorHandler));
  }
  updateDpt(id: number, dpt: Dpt): Observable<Dpt> {
    return this.http.put<Dpt>(`${environment.Url}/department-program-type/${id}`, dpt ).pipe( catchError( this.errorHandler));
  }
  findDptById(id: number): Observable<DptResponse> {
    return this.http.get<DptResponse>(`${environment.Url}/department-program-type/${id}` ).pipe( catchError( this.errorHandler));
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

