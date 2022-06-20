import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryTypeModel } from 'src/app/models/category-type-interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategoryTypeService {
  private url = "http://localhost:8080";
  constructor(private httpClient:HttpClient) { }


  getAll():Observable<CategoryTypeModel[]>{
    return this.httpClient.get<CategoryTypeModel[]>(this.url+"/categoryType");
  }

}
