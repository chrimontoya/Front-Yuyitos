import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderModel } from 'src/app/models/order.interfaces';
import { OrderDetailsModel } from 'src/app/models/orderDetails.interfaces';
import { OrderDetailsService } from 'src/app/services/rest/order-details.service';
import { OrderService } from 'src/app/services/rest/order.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-receive-product',
  templateUrl: './receive-product.component.html',
  styleUrls: ['./receive-product.component.css']
})
export class ReceiveProductComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public orders:OrderModel[],
  private dialog:MatDialog,
  private orderDetailsService:OrderDetailsService) { }

  ngOnInit(): void {
  }

  openModal(id:number){

    this.orderDetailsService.findByIdOrder(id).subscribe({
      next:(details)=>{
        console.log(details);
        if(details)this.dialog.open(ProductFormComponent,{data: [this.orders[0],details]});
      }
    });


    
  }

}
