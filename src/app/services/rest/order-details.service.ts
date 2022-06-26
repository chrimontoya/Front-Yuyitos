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
  private suffix = "/find-by-id-order";
  constructor(private http:HttpClient) { }


  getAll():Observable<OrderDetailsModel[]>{
    return this.http.get<OrderDetailsModel[]>(this.url);
  }

  getById(id:number):Observable<OrderDetailsModel>{
    return this.http.get<OrderDetailsModel>(this.url+"/"+id);
  }

  add(orderDetails:OrderDetailsModel):Observable<OrderDetailsModel>{
    return this.http.post<OrderDetailsModel>(this.url,orderDetails);
  }

  delete(id:number):Observable<OrderDetailsModel>{
    return this.http.delete<OrderDetailsModel>(this.url+"/"+id);
  }

  findByIdOrder(id:number):Observable<OrderDetailsModel[]>{
    return this.http.get<OrderDetailsModel[]>(this.url+this.suffix+"/"+id);
  }

}
