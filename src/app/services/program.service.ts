import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Program, ProgramResponse} from '../model/program';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor(private http:HttpClient) { }

  getPrograms(pageNumber: number = 1, pageSize: number = 10 ):Observable<ProgramResponse>
  {
    const params = new HttpParams()
      .append('page', `${pageNumber}`)
      .append('size', `${pageSize}`);
    return this.http.get<ProgramResponse>(`${environment.Url}/programs`,{params} );
  }
  addProgram(program:Program):Observable<Program>
  {
    return this.http.post<Program>(`${environment.Url}/programs`,program    );
  }
  deleteProgram(id:number):Observable<Program>
  {
    return this.http.delete<Program>(`${environment.Url}/programs/${id}`    );
  }
  updateProgram(id: number, value: Program): Observable<Program> {
    return this.http.put<Program>(`${environment.Url}/programs/${id}`, value );
  }
  findProgramById(id: number): Observable<ProgramResponse> {
    return this.http.get<ProgramResponse>(`${environment.Url}/programs/${id}` );
  }
}

