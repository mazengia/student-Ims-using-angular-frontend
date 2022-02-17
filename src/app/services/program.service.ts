import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProgramResponse} from '../model/program';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private http:HttpClient) { }

  getPrograms( ):Observable<ProgramResponse>
  {
    return this.http.get<ProgramResponse>(`${environment.Url}/programs` );
  }
  addProgram(inputName:any):Observable<any>
  {
    return this.http.post(`${environment.Url}/programs`,inputName ,{ responseType: 'text' }  );
  }
  deleteProgram(id:number):Observable<any>
  {
    return this.http.post(`${environment.Url}/${id}` ,{ responseType: 'text' }  );
  }
  updateProgram(id: number, value: any): Observable<any> {
    return this.http.put(`${environment.Url}/${id}`, value,{ responseType: 'text' });
  }
  findProgramById(id: number): Observable<any> {
    return this.http.get(`${environment.Url}/programs/${id}` );
  }
}

