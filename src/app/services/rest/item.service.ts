import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemModel } from 'src/app/models/item.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private url = "http://localhost:8080/";
  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ItemModel[]>{
    return this.httpClient.get<ItemModel[]>(this.url+"item");
  }

  getById(id:number):Observable<ItemModel>{
    return this.httpClient.get<ItemModel>(this.url+"item/"+id);
  }
}
