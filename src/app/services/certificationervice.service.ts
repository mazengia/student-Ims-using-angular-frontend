import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Certification, CertificationResponse} from '../model/certification';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CertificationService {

  constructor(private http:HttpClient) { }

  getCertification(pageNumber: number = 1, pageSize: number = 10 ):Observable<CertificationResponse>
  {
    const params = new HttpParams()
      .append('page', `${pageNumber}`)
      .append('size', `${pageSize}`);
    return this.http.get<CertificationResponse>(`${environment.Url}/programs`,{params} );
  }
  addCertification(program:Certification):Observable<Certification>
  {
    return this.http.post<Certification>(`${environment.Url}/programs`,program    );
  }
  deleteCertification(id:number):Observable<Certification>
  {
    return this.http.delete<Certification>(`${environment.Url}/programs/${id}`    );
  }
  updateCertification(id: number, value: Certification): Observable<Certification> {
    return this.http.put<Certification>(`${environment.Url}/programs/${id}`, value );
  }
  findCertificationById(id: number): Observable<CertificationResponse> {
    return this.http.get<CertificationResponse>(`${environment.Url}/programs/${id}` );
  }
}

