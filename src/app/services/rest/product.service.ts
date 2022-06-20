import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/app/models/product.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = 'http://localhost:8080/products';
  private refresh = new EventEmitter();
  constructor(private http: HttpClient) {}

  getAll(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.url);
  }

  getById(): Observable<ProductModel> {
    return this.http.get<ProductModel>(this.url);
  }

  add(product: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(this.url, product);
  }

  delete(id: Number): Observable<ProductModel> {
    return this.http.delete<ProductModel>(this.url + '/' + id);
  }
}
