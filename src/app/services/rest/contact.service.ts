import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactModel } from 'src/app/models/contact.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private url = "http://localhost:8080/";
  private suffix = "find-by-id-supplier";
  constructor(private httpClient:HttpClient) { }

  add(contact:ContactModel){
    console.log(contact);
    return this.httpClient.post(this.url+"contact",contact);
  }

  getAll():Observable<ContactModel[]>{
    return this.httpClient.get<ContactModel[]>(this.url+'contact');
  }

  findById(id:number):Observable<ContactModel>{
    return this.httpClient.get<ContactModel>(this.url+'contact/'+id);
  }

  findByIdSupplier(id:number):Observable<ContactModel[]>{
    return this.httpClient.get<ContactModel[]>(this.url+"contact/"+this.suffix+"/"+id);
  }

}
