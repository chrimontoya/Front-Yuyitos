import { Component, OnInit } from '@angular/core';
import { OrderModel } from 'src/app/models/order.interfaces';
import { OrderDetailsModel } from 'src/app/models/orderDetails.interfaces';
import { OrderDetailsService } from 'src/app/services/rest/order-details.service';
import { OrderService } from 'src/app/services/rest/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders!:OrderModel[];
  orderDetails!:OrderDetailsModel[];
  constructor(private orderService:OrderService,private orderDetailsService:OrderDetailsService) { }

  ngOnInit(): void {
    this.getAllOrders();
    this.getAllOrderDetails();
  }

  getAllOrders(){
    this.orderService.getAll().subscribe({
      next:(orders)=>{
        this.orders=orders;
      }
    })
  }
  
  getAllOrderDetails(){
     this.orderDetailsService.getAll().subscribe({
       next:(orderDetails)=>{this.orderDetails=orderDetails;},
     })
  }

}
