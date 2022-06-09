import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetailsModel } from 'src/app/models/orderDetails.interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
  refresh = new EventEmitter();
  private url = "http://localhost:8080/orderDetails";
  constructor(private http:HttpClient) { }


  getAll():Observable<OrderDetailsModel[]>{
    return this.http.get<OrderDetailsModel[]>(this.url);
  }

  getById(id:number):Observable<OrderDetailsModel>{
    return this.http.get<OrderDetailsModel>(this.url);
  }

}
