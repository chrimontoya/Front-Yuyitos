import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.interfaces';
import { SaleAndDetailsModel } from 'src/app/models/sale-and-details.interfaces';
import { SaleModel } from 'src/app/models/sale.interfaces';
import { ProductService } from 'src/app/services/rest/product.service';
import { SaleService } from 'src/app/services/rest/sale.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {
  public sales!: SaleModel[];
  public saleAndDetails!:SaleAndDetailsModel[];
  constructor(private saleService: SaleService) { }

  ngOnInit(): void {
    this.getAllSaleAndDetails();
   
  }

  getAllSales() {
    this.saleService.getAll().subscribe({ 
      next: (sales:SaleModel[]) => {this.sales = sales}
    })
  }

  getAllSaleAndDetails(){
    this.saleService.getAllSaleAndDetails().subscribe({
      next:(saleAndDetails:SaleAndDetailsModel[])=>{
        this.saleAndDetails=saleAndDetails; console.log(saleAndDetails);
    }});
  }


}
