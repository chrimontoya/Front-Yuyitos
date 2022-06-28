import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  status=false;
  number=0;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  changepPage(number: number){
    this.number=number;
} 
  singOut(){
    this.router.navigateByUrl("/login");
  }

}
