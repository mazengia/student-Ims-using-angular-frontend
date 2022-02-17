import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {StatusResponse} from '../model/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {


  constructor(private http:HttpClient) { }

  getStatus( ):Observable<StatusResponse>
  {
    return this.http.get<StatusResponse>(`${environment.Url}/status` );
  }
  addStatus(inputName:any):Observable<any>
  {
    return this.http.post(`${environment.Url}/status`,inputName ,{ responseType: 'text' }  );
  }
  deleteStatus(id:number):Observable<any>
  {
    return this.http.post(`${environment.Url}/${id}` ,{ responseType: 'text' }  );
  }
  updateStatus(id: number, value: any): Observable<any> {
    return this.http.put(`${environment.Url}/${id}`, value,{ responseType: 'text' });
  }
  findStatusById(id: number): Observable<any> {
    return this.http.get(`${environment.Url}/status/${id}` );
  }
}

