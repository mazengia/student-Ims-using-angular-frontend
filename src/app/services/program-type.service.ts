import { Injectable } from '@angular/core';
import {ProgramResponse} from '../model/program';
import {environment} from '../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProgramType, ProgramTypeResponse} from "../model/programType";
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
  addProgramType(programType:ProgramType):Observable<ProgramType>
  {
    return this.http.post<ProgramType>(`${environment.Url}/program-type`,programType    );
  }
  deleteProgramType(id:number):Observable<ProgramType>
  {
    return this.http.delete<ProgramType>(`${environment.Url}/program-type/${id}`   );
  }
  updateProgramType(id: number, programType: ProgramType): Observable<ProgramType> {
    return this.http.put<ProgramType>(`${environment.Url}/program-type/${id}`, programType );
  }
  findProgramTypeById(id: number): Observable<ProgramType> {
    return this.http.get<ProgramType>(`${environment.Url}/program-type/${id}` );
  }
}

