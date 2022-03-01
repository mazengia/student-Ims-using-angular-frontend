import { Injectable } from '@angular/core';
import {ProgramResponse} from '../model/program';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProgramTypeResponse} from "../model/programType";
@Injectable({
  providedIn: 'root'
})
export class ProgramTypeService {

  constructor(private http:HttpClient) { }

  getProgramsType( pageNumber: number = 1, pageSize: number = 10 ):Observable<ProgramTypeResponse>
  { const params = new HttpParams()
    .append('page', `${pageNumber}`)
    .append('size', `${pageSize}`);
    return this.http.get<ProgramTypeResponse>(`${environment.Url}/program-type`,{params} );
  }
  addProgramType(inputName:any):Observable<any>
  {
    return this.http.post(`${environment.Url}/program-type`,inputName ,{ responseType: 'text' }  );
  }
  deleteProgramType(id:number):Observable<any>
  {
    return this.http.post(`${environment.Url}/program-type/${id}` ,{ responseType: 'text' }  );
  }
  updateProgramType(id: number, value: any): Observable<any> {
    return this.http.put(`${environment.Url}/program-type/${id}`, value,{ responseType: 'text' });
  }
  findProgramTypeById(id: number): Observable<any> {
    return this.http.get(`${environment.Url}/program-type/${id}` );
  }
}

