import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SaleDetailsModel } from 'src/app/models/saleDetails.interfaces';

@Injectable({
  providedIn: 'root'
})
export class SaleDetailsService {
  private url = "http://localhost:8080/";
  //private ENDPOINT = "saleDetails";
  constructor(private http:HttpClient) { }

  
  getAll(): Observable<SaleDetailsModel[]> {
    return this.http.get<SaleDetailsModel[]>(this.url+"saleDetails");
  }

  getById(id:number): Observable<SaleDetailsModel> {
    return this.http.get<SaleDetailsModel>(this.url+"saleDetails/"+id);
  }

  add(saleDetails: SaleDetailsModel): Observable<Number> {
    return this.http.post<Number>(this.url+"saleDetails", saleDetails);
  }

  delete(id: Number): Observable<SaleDetailsModel> {
    return this.http.delete<SaleDetailsModel>(this.url + 'saleDetails/' + id);
  }
}
