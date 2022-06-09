import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductModel } from 'src/app/models/product.interfaces';
import { ProductService } from 'src/app/services/rest/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm!:FormGroup;
  constructor(private fb: FormBuilder,private productSvc:ProductService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.productForm=this.fb.group({
      name: '',
      stock: '',
      dateExpiration: '',
      image:'',
      idCategory: '',
    })
  }

  saveProduct(){
    /*this.productSvc.post(this.productForm.getRawValue()).subscribe({
      next: (product:ProductModel)=>console.log(product)
    })*/
    console.log(this.productForm.getRawValue());
  }

}
