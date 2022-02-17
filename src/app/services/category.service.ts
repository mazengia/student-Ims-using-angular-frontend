import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {CategoryResponse} from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getCategories(pageNumber:number = 0,pageSize:number = 20):Observable<CategoryResponse>
  {
    const params =  new HttpParams()
      .append('page',`${pageNumber}`)
      .append('size',`${pageSize}`);
    return this.http.get<CategoryResponse>(`${environment.Url}/categories`, {params} );
  }

  addCategory(inputTitle:any):Observable<any>
  {
    return this.http.post(`${environment.Url}/categories`,inputTitle ,{ responseType: 'text' }  );
  }

  deleteCategory(id:number):Observable<any>
  {
    return this.http.post(`${environment.Url}/categories/${id}` ,{ responseType: 'text' }  );
  }
  findCategoryById(id: number): Observable<any> {
    return this.http.get(`${environment.Url}/categories/${id}` );
  }
  updateCategory(id: number, value: any): Observable<any> {
    return this.http.put(`${environment.Url}/categories/${id}`, value,{ responseType: 'text' });
  }

}
