import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SaleAndDetailsModel } from 'src/app/models/sale-and-details.interfaces';
import { SaleModel } from 'src/app/models/sale.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private url = "http://localhost:8080/";
  private ENDPOINT = "sale-and-details";
  constructor(private http:HttpClient) { }

  
  getAll(): Observable<SaleModel[]> {
    return this.http.get<SaleModel[]>(this.url+"sale");
  }

  getById(id:number): Observable<SaleModel> {
    return this.http.get<SaleModel>(this.url+"sale/"+id);
  }

  add(sale: SaleModel): Observable<Number> {
    return this.http.post<Number>(this.url+"sale", sale);
  }

  delete(id: Number): Observable<SaleModel> {
    return this.http.delete<SaleModel>(this.url + 'sale/' + id);
  }

  getAllSaleAndDetails():Observable<SaleAndDetailsModel[]>{
    return this.http.get<SaleAndDetailsModel[]>(this.url+this.ENDPOINT);
  }
}

