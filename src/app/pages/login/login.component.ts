import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/services/rest/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!:FormGroup
  constructor(private fb:FormBuilder,private loginService:LoginService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.formLogin=this.fb.group({
      username: '',
      password: '',
    })
  }

  signIn(){
    

    const json = {
      "username": this.formLogin.get('username')?.value,      
      "password": this.formLogin.get('password')?.value
    }

    
    this.loginService.logIn(json).subscribe({
      next:(user)=>{
        console.log(user);
      }
    })
  }

}
