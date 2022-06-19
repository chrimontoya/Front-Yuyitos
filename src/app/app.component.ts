import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(){
     
  }
  number=0;
  changepPage(number: number){
      this.number=number;
  } 
}
