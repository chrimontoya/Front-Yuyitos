import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactModel } from 'src/app/models/contact.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private url = "http://localhost:8080/";
  constructor(private httpClient:HttpClient) { }

  add(contact:ContactModel){
    console.log(contact);
    return this.httpClient.post(this.url+"contact",contact);
  }

}
