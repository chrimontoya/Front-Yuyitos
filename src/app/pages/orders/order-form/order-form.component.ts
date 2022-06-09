import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductModel } from 'src/app/models/product.interfaces';
import { SupplierModel } from 'src/app/models/supplier.interface';
import { ProductService } from 'src/app/services/rest/product.service';
import { SupplierService } from 'src/app/services/rest/supplier.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent implements OnInit {
  orderForm!: FormGroup;
  products!: ProductModel[];
  suppliers!: SupplierModel[];
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllSupplier();
    this.createForm();
  }

  createForm() {
    this.orderForm = this.fb.group({
      nameProduct: '',
      stock: '',
      price: '',
      idSupplier:'',
      product: '',
    });
  }



  getAllProducts(){
    this.productService.getAll().subscribe({
      next: (products)=>this.products=products,
    })
  }

  getAllSupplier(){
    this.supplierService.getAll().subscribe({
      next: (suppliers)=>this.suppliers=suppliers,
    })
  }

  saveOrder(){
    //this.supplierService.post();
    const detailsOrder = {
      nameProduct: 'null',
      stock: this.orderForm.get('stock')?.value,
      price: this.orderForm.get('price')?.value,
      dateExpiration: new Date(),
      product:this.orderForm.get('product')?.value,
      order:2,
    }

    console.log(detailsOrder)
  }
}
