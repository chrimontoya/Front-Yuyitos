import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientModel } from 'src/app/models/client.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private url = "http://localhost:8080/client";
  constructor(private http:HttpClient) { }

  getAll():Observable<ClientModel[]>{
    return this.http.get<ClientModel[]>(this.url);
  }

  getById(id:number):Observable<ClientModel>{
    return this.http.get<ClientModel>(this.url+"/"+id);
  }

  add(client:ClientModel):Observable<number>{
    return this.http.post<number>(this.url,client);
  }

  delete(id:number):Observable<ClientModel>{
    return this.http.delete<ClientModel>(this.url+"/"+id);
  }
}
