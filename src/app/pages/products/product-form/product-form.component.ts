import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { CategoryTypeModel } from 'src/app/models/category-type-interfaces';
import { OrderDetailsModel } from 'src/app/models/orderDetails.interfaces';
import { ProductModel } from 'src/app/models/product.interfaces';
import { CategoryTypeService } from 'src/app/services/rest/category-type.service';
import { ProductService } from 'src/app/services/rest/product.service';
import { getCurrentDate } from 'src/utils/Date.utils';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  categoryTypes!: CategoryTypeModel[];
  selectedItem!: MatSelectChange;

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private categoryTypeService: CategoryTypeService,
   // @Inject(MAT_DIALOG_DATA)public product:ProductModel,
    @Inject(MAT_DIALOG_DATA) public orderDetails:OrderDetailsModel[]) { }

  ngOnInit(): void {
    console.log(this.orderDetails);
  }

  // createForm() {
  //   if(this.product){
  //     this.productForm = this.fb.group({
  //       id: this.product.id,
  //       name: this.product.name,
  //       stock: this.product.stock,
  //       price: this.product.price,
  //       dateExpiration: this.product.dateExpiration,
  //       image: this.product.image,
  //       categoryType: this.product.categoryType.id
  //     })
  //   }else{
  //     this.productForm = this.fb.group({
  //       name: '',
  //       stock: [{ value: '0', disabled: true }],
  //       price: '',
  //       dateExpiration: [{ value: getCurrentDate(), disabled: true }],
  //       image: '',
  //       categoryType: ''
  //     });
  //   }
  // }

  getAllCategoryTypes() {
    this.categoryTypeService.getAll().subscribe({
      next: (categoryTypes) => { this.categoryTypes = categoryTypes }
    });
  }

  getSelectedSection(event: MatSelectChange) {
    this.selectedItem = event;
  }


  // saveProduct() {
  //     const product = {
  //       id: this.product?this.product.id:null,
  //       name: this.productForm.get('name')?.value,
  //       stock: this.productForm.get('stock')?.value,
  //       price: this.productForm.get('price')?.value,
  //       dateExpiration: new Date(),
  //       image: this.productForm.get('image')?.value,
  //       categoryType: {
  //         id: this.selectedItem.value
  //       },
  //     } as ProductModel;
  //     console.log(this.productForm.get('categoryType')?.value);
  //     console.log(product);
  //     this.productService.add(product).subscribe({
  //       next: () => {
  //       }
  //     })


  // }

}
