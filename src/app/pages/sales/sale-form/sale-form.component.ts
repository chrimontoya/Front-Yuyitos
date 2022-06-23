import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ClientModel } from 'src/app/models/client.interfaces';
import { ProductModel } from 'src/app/models/product.interfaces';
import { SaleAndDetailsModel } from 'src/app/models/sale-and-details.interfaces';
import { SaleModel } from 'src/app/models/sale.interfaces';
import { SaleDetailsModel } from 'src/app/models/saleDetails.interfaces';
import { ClientService } from 'src/app/services/rest/client.service';
import { ProductService } from 'src/app/services/rest/product.service';
import { SaleDetailsService } from 'src/app/services/rest/sale-details.service';
import { SaleService } from 'src/app/services/rest/sale.service';

@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.css']
})
export class SaleFormComponent implements OnInit {
  saleForm!: FormGroup;
  form!: FormGroup;
  products!: ProductModel[];
  selectedProduct: number[] = [];
  selectedItem!: MatSelectChange;
  selectForm!: FormGroup;
  fiados = [{ id: 1, status: 0 }, { id: 2, status: 1 }]
  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public saleAndDetail: SaleAndDetailsModel,
    private productService: ProductService,
    private clientService: ClientService,
    private saleService: SaleService,
    private saleDetailsService: SaleDetailsService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllProducts();
    this.form = new FormGroup({
      product: new FormArray([
        new FormGroup({
          id: new FormControl(this.saleAndDetail ? this.saleAndDetail.idProduct : ''),
          stock: new FormControl(this.saleAndDetail ? this.saleAndDetail.stock : '')
        })
      ])
    });
    console.log(this.saleAndDetail);
  }

  getAllProducts() {
    this.productService.getAll().subscribe({
      next: (products) => this.products = products
    })
  }

  createForm() {
    this.saleForm = this.fb.group({
      rut: this.saleAndDetail ? this.saleAndDetail.rut : '',
      dv: this.saleAndDetail ? this.saleAndDetail.dv : '',
      name: this.saleAndDetail ? this.saleAndDetail.name : '',
      lastName: this.saleAndDetail ? this.saleAndDetail.lastName : '',
      lastNameMother: this.saleAndDetail ? this.saleAndDetail.lastNameMother : '',
      fiado: this.saleAndDetail ? this.saleAndDetail.fiado : '',
    })
  }

  getSelectedProduct(event: MatSelectChange) {
    this.selectedProduct.push(event.value);
  }

  getSelectedItem(event: MatSelectChange) {
    this.selectedItem = event;
  }


  get product(): FormArray {
    return this.form.get('product') as FormArray;
  }

  addProduct() {
    this.product.push(
      new FormGroup({
        id: new FormControl(''),
        stock: new FormControl('')
      })
    );
  }
  deleteProduct() {
    if (this.product.length > 1) this.product.removeAt(-1);
  }


  saveSale() {

    const client = {
      id: this.saleAndDetail ? this.saleAndDetail.idClient : null,
      rut: this.saleForm.get('rut')?.value,
      dv: this.saleForm.get('dv')?.value,
      name: this.saleForm.get('name')?.value,
      lastName: this.saleForm.get('lastName')?.value,
      lastNameMother: this.saleForm.get('lastNameMother')?.value,
      fiado: this.saleAndDetail ? this.saleAndDetail.fiado : this.selectedItem.value
    } as ClientModel;

    this.clientService.add(client).subscribe({
      next: (idClient) => {
        const sale = {
          id: this.saleAndDetail ? this.saleAndDetail.idSale : null,
          dateCreation: new Date(),
          client: {
            id: this.saleAndDetail ? this.saleAndDetail.idClient : idClient
          }
        } as SaleModel;

        this.saleService.add(sale).subscribe({
          next: (idSale) => {
            for (const key in this.product.value) {
              const currentProduct = this.products.find((currentProd) => currentProd.id == this.product.value[key].id);
              const saleDetails = {
                id: this.saleAndDetail ? this.saleAndDetail.idSaleDetail : null,
                stock: this.product.value[key].stock,
                sale: this.saleAndDetail ? this.saleAndDetail.idSale : idSale,
                product: currentProduct?.id ? currentProduct.id : this.saleAndDetail.idProduct
              } as SaleDetailsModel;

              this.saleDetailsService.add(saleDetails).subscribe({
                next: () => { console.log("ok"); }
              })
            }
          }
        })
      }
    })
  }

}
