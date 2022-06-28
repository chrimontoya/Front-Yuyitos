import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { DialogMessageFailureComponent } from 'src/app/components/dialogs/dialog-message-failure/dialog-message-failure.component';
import { DialogMessageSuccessComponent } from 'src/app/components/dialogs/dialog-message-success/dialog-message-success.component';
import { CategoryTypeModel } from 'src/app/models/category-type-interfaces';
import { ContactModel } from 'src/app/models/contact.interfaces';
import { OrderModel } from 'src/app/models/order.interfaces';
import { OrderDetailsModel } from 'src/app/models/orderDetails.interfaces';
import { ProductModel } from 'src/app/models/product.interfaces';
import { CategoryTypeService } from 'src/app/services/rest/category-type.service';
import { ContactService } from 'src/app/services/rest/contact.service';
import { OrderService } from 'src/app/services/rest/order.service';
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
  order!:OrderModel;
  orderDetails!:OrderDetailsModel[];
  contacts!:ContactModel[];
  productArr:any[]=[];
  productStatus!:boolean;
  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private categoryTypeService: CategoryTypeService,
    private contactService:ContactService,
    private orderService:OrderService,
    private dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any[]) { }

  ngOnInit(): void {
    this.orderDetails=this.data[1];
    this.order=this.data[0];
    this.getContacts();
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

  getContacts(){
    this.contactService.findByIdSupplier(this.order.supplier.id).subscribe({
      next:(contacts)=>{
        this.contacts=contacts;
    }})
  }

  sendProducts(){
    for (const key in this.productArr) {
      this.productService.getById(this.productArr[key].id).subscribe({next:(product)=>{
        if(product){
          const updateProduct = {
            id:product.id,
            name: product.name,
            stock: product.stock+this.productArr[key].stock,
            price: product.price,
            dateExpiration: product.dateExpiration,
            image: product.image,
            categoryType: product.categoryType
          } as ProductModel;
          this.productService.add(updateProduct).subscribe({next:()=>{
            const order = {
              id: this.order.id,
              dateCreate: this.order.dateCreate,
              status: true,
              supplier: this.order.supplier
            } as OrderModel;
            this.orderService.add(order).subscribe({next:()=>{
              this.dialog.open(DialogMessageSuccessComponent)
            },
          error:()=>this.dialog.open(DialogMessageFailureComponent)})
          },
        error:()=>this.dialog.open(DialogMessageFailureComponent)})
        }
      }})
    }
  }

  test(event:any,details:any){
   
    if(event==true){
      this.productArr.push({id:details.product.id,name:details.product.name,stock:details.stock,price:details.product.price});
    }else{
      this.productArr=this.productArr.filter((product)=>product.id!==details.product.id);
    }
    console.log(this.productArr);
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
