import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.interfaces';
import { ProductService } from 'src/app/services/rest/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products!:ProductModel[];
  constructor(private productSvc:ProductService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.productSvc.getAll().subscribe({
      next: (products:ProductModel[])=>this.products=products,
    });
  }

}
