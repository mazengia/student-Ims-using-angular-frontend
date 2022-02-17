import { Injectable } from '@angular/core';
import {ProgramResponse} from '../model/program';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProgramTypeService {

  constructor(private http:HttpClient) { }

  getProgramsType( ):Observable<ProgramResponse>
  {
    return this.http.get<ProgramResponse>(`${environment.Url}/type` );
  }
  addProgramType(inputName:any):Observable<any>
  {
    return this.http.post(`${environment.Url}/type`,inputName ,{ responseType: 'text' }  );
  }
  deleteProgramType(id:number):Observable<any>
  {
    return this.http.post(`${environment.Url}/type/${id}` ,{ responseType: 'text' }  );
  }
  updateProgramType(id: number, value: any): Observable<any> {
    return this.http.put(`${environment.Url}/type/${id}`, value,{ responseType: 'text' });
  }
  findProgramTypeById(id: number): Observable<any> {
    return this.http.get(`${environment.Url}/type/${id}` );
  }
}

