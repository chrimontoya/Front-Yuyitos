import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/rest/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!:FormGroup
  @Input() status!:Boolean;
  constructor(private fb:FormBuilder,private loginService:LoginService,private router:Router) { }

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
        if(user){
          this.router.navigateByUrl("/almacen/ventas");
        }
      }
    })
  }

}
