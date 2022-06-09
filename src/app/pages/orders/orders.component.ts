import { Component, OnInit } from '@angular/core';
import { OrderDetailsModel } from 'src/app/models/orderDetails.interfaces';
import { OrderDetailsService } from 'src/app/services/rest/order-details.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orderDetails!:OrderDetailsModel[];
  constructor(private orderDetailsService:OrderDetailsService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.orderDetailsService.getAll().subscribe({
      next:(orderDetails)=>{this.orderDetails=orderDetails;console.log(orderDetails)},
    })
  }

}
