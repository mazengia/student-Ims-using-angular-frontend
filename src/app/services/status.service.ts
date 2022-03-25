import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {StatusResponse} from '../model/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {


  constructor(private http:HttpClient) { }

  getStatus( pageNumber: number = 1, pageSize: number = 10):Observable<StatusResponse>
  {const params = new HttpParams()
    .append('page', `${pageNumber}`)
    .append('size', `${pageSize}`);
    return this.http.get<StatusResponse>(`${environment.Url}/status`,{params} );
  }
  addStatus(inputName:any):Observable<any>
  {
    return this.http.post(`${environment.Url}/status`,inputName ,{ responseType: 'text' }  );
  }
  deleteStatus(id:number):Observable<any>
  {
    return this.http.delete(`${environment.Url}/status/${id}` ,{ responseType: 'text' }  );
  }
  updateStatus(id: number, value: any): Observable<any> {
    return this.http.put(`${environment.Url}/status/${id}`, value,{ responseType: 'text' });
  }
  findStatusById(id: number): Observable<any> {
    return this.http.get(`${environment.Url}/status/${id}` );
  }
}

