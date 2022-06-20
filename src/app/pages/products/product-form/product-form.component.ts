import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { CategoryTypeModel } from 'src/app/models/category-type-interfaces';
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
  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private categoryTypeService: CategoryTypeService,
    @Inject(MAT_DIALOG_DATA)public product:ProductModel) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllCategoryTypes();
  }

  createForm() {
    if(this.product){
      this.productForm = this.fb.group({
        id: this.product.id,
        name: this.product.name,
        stock: this.product.stock,
        dateExpiration: this.product.dateExpiration,
        image: this.product.image,
        categoryType: this.product.categoryType.id
      })
    }else{
      this.productForm = this.fb.group({
        name: '',
        stock: [{ value: '0', disabled: true }],
        dateExpiration: [{ value: getCurrentDate(), disabled: true }],
        image: '',
        categoryType: ''
      });
    }
  }

  getAllCategoryTypes() {
    this.categoryTypeService.getAll().subscribe({
      next: (categoryTypes) => { this.categoryTypes = categoryTypes }
    });
  }

  getSelectedSection(event: MatSelectChange) {
    this.selectedItem = event;
  }


  saveProduct() {
      const product = {
        id: this.product?this.product.id:null,
        name: this.productForm.get('name')?.value,
        stock: this.productForm.get('stock')?.value,
        dateExpiration: new Date(),
        image: this.productForm.get('image')?.value,
        categoryType: {
          id: this.product?this.product.categoryType.id:this.productForm.get('categoryType')?.value
        },
      } as ProductModel;

      console.log(product);
      this.productService.add(product).subscribe({
        next: () => {
        }
      })


  }

}
