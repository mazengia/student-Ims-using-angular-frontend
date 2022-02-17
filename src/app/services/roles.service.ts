
import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Roles, RolesResponse} from '../model/Roles';
@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http:HttpClient) { }

  getRoles(pageNumber:number = 1,pageSize:number = 10 ):Observable<RolesResponse>
  {const params =  new HttpParams()
    .append('page',`${pageNumber}`)
    .append('size',`${pageSize}`);
    return this.http.get<RolesResponse>(`${environment.Url}/role`,{params} );
  }
  addRoles(roleName:any):Observable<Roles>
  {
    return this.http.post<Roles>(`${environment.Url}/role`,roleName );
  }
  deleteRoles(id:number):Observable<Roles>
  {
    return this.http.delete<Roles>(`${environment.Url}/role/${id}`   );
  }
  updateRoles(id: number, roleName: any): Observable<Roles> {
    return this.http.put<Roles>(`${environment.Url}/role/${id}`, roleName );
  }
  findRolesById(id: number): Observable<Roles> {
    return this.http.get<Roles>(`${environment.Url}/role/${id}` );
  }
}
