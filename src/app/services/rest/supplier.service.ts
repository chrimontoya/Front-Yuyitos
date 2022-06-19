import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SupplierModel } from 'src/app/models/supplier.interface';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private url = "http://localhost:8080/suppliers";
  private refresh = new EventEmitter();
  constructor(private http:HttpClient) { }

  getAll():Observable<SupplierModel[]>{
    return this.http.get<SupplierModel[]>(this.url);
  }

  getById(id:number):Observable<SupplierModel>{
    return this.http.get<SupplierModel>(this.url+"/"+id);
  }

  add(supplier:SupplierModel):Observable<Number>{
    return this.http.post<Number>(this.url,supplier);
  }

  delete(id:number):Observable<SupplierModel>{
    return this.http.delete<SupplierModel>(this.url+"/"+id);
  }

}
