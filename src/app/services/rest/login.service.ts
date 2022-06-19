import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = "http://localhost:8080";
  constructor(private httpClient:HttpClient) { }

  logIn(user: any){
    return this.httpClient.post(this.url+"/login",user);
  }

}
