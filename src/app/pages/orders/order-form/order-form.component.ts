import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ContactModel } from 'src/app/models/contact.interfaces';
import { OrderModel } from 'src/app/models/order.interfaces';
import { OrderDetailsModel } from 'src/app/models/orderDetails.interfaces';
import { ProductModel } from 'src/app/models/product.interfaces';
import { SupplierModel } from 'src/app/models/supplier.interface';
import { ContactService } from 'src/app/services/rest/contact.service';
import { OrderDetailsService } from 'src/app/services/rest/order-details.service';
import { OrderService } from 'src/app/services/rest/order.service';
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
  contacts!: ContactModel[];
  form!: FormGroup;
  selectForm!: FormGroup;
  supplierDetails!: any;
  contactBySupplier!: any;
  selectedProduct: number[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) private ordenDetails: OrderDetailsModel,
    private fb: FormBuilder,
    private productService: ProductService,
    private supplierService: SupplierService,
    private contactService: ContactService,
    private orderService: OrderService,
    private orderDetailsService: OrderDetailsService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllSupplier();
    this.getAllContacts();
    this.form = new FormGroup({
      product: new FormArray([
        new FormGroup({
          name:  new FormControl(this.ordenDetails?this.ordenDetails.product.id:''),
          stock: new FormControl(this.ordenDetails?this.ordenDetails.stock:''),
          price: new FormControl(this.ordenDetails?this.ordenDetails.price:'')
        })
      ])
    });
    this.createSelectForm();
  }

  createSelectForm() {
    this.selectForm = this.fb.group({
      supplier: this.ordenDetails?this.ordenDetails.order.supplier.id:'',
    })
  }

  getSelectedItem(event: MatSelectChange) {
    const supplier = this.suppliers.find((supplier: SupplierModel) => supplier.id == event.value);
    const contacts = this.contacts.filter((contact) => contact.supplier == supplier?.id);
    this.supplierDetails = supplier;
    this.contactBySupplier = contacts;
  }

  getSelectedProduct(event: MatSelectChange) {
    this.selectedProduct.push(event.value);
  }

  get product(): FormArray {
    return this.form.get('product') as FormArray;
  }

  addProduct() {
    this.product.push(
      new FormGroup({
        name: new FormControl(''),
        stock: new FormControl(''),
        price: new FormControl('')
      })
    );
  }

  deleteProduct() {
    if (this.product.length > 1) this.product.removeAt(-1);
  }

  getAllProducts() {
    this.productService.getAll().subscribe({
      next: (products) => this.products = products,
    })
  }

  getAllSupplier() {
    this.supplierService.getAll().subscribe({
      next: (suppliers) => this.suppliers = suppliers,
    })
  }

  getAllContacts() {
    this.contactService.getAll().subscribe({
      next: (contacts) => this.contacts = contacts,
    })
  }

  saveOrder() {

    //   for (const key in this.product.value) {
    //validar    console.log(this.product.value[key].name?true:false);
    // }
    if(this.ordenDetails)console.log("primero",this.ordenDetails.dateExpiration);
    const order = {
      id: this.ordenDetails?this.ordenDetails.order.id:null,
      dateCreate: new Date(),
      status: 0,
      supplier: this.ordenDetails?{id: this.ordenDetails.order.supplier.id}:this.supplierDetails
    } as unknown as OrderModel;
    console.log(order);
    this.orderService.add(order).subscribe({
      next: (idOrder) => {
        if (idOrder) {
          for (const key in this.product.value) {
            const id = idOrder;
            const orderDetails = {
              id: this.ordenDetails?this.ordenDetails.id:null,
              stock: this.product.value[key].stock,
              price: this.product.value[key].price,
              dateExpiration: this.ordenDetails?this.ordenDetails.dateExpiration:new Date(),
              product: {
                id: this.product.value[key].name
              },
              order: {
                id: id
              }
            } as OrderDetailsModel;

            console.log(orderDetails);
            this.orderDetailsService.add(orderDetails).subscribe({
              next: () => {
                console.log("funciona mierda");
              }
            })
          }
        }
      }
    })
  }

  //   saveSupplier() {

  //     const order = {
  //       id: this.supplier ? this.supplier.id : null,
  //       rut: this.supplierForm.get('rut')?.value,
  //       dv: this.supplierForm.get('dv')?.value,
  //       name: this.supplierForm.get('name')?.value,
  //       item: {
  //         id: this.supplier ? this.supplier.item.id : this.supplierForm.get('item')?.value
  //       }
  //     } as SupplierModel;

  //     this.supplierService.add(supplier).subscribe({
  //       next: (supplier) => {
  //         const contact = {
  //           id: this.supplier ? this.supplier.contact.id : null,
  //           email: this.supplierForm.get('email')?.value,
  //           phone: this.supplierForm.get('phone')?.value,
  //           supplier: this.supplier ? this.supplier.id : supplier
  //         } as ContactModel;

  //         this.contactService.add(contact).subscribe({
  //           next: () => {
  //           }
  //         })
  //       }
  //     });
  // }
}
