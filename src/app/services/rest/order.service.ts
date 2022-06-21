import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderModel } from 'src/app/models/order.interfaces';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  refresh = new EventEmitter();
  private url = "http://localhost:8080/orders";
  constructor(private http:HttpClient) { }


  getAll():Observable<OrderModel[]>{
    return this.http.get<OrderModel[]>(this.url);
  }

  getById(id:number):Observable<OrderModel>{
    return this.http.get<OrderModel>(this.url+"/"+id);
  }

  add(order:OrderModel):Observable<number>{
    return this.http.post<number>(this.url,order);
  }

  delete(id:number):Observable<OrderModel>{
    return this.http.delete<OrderModel>(this.url+"/"+id);
  }

}
