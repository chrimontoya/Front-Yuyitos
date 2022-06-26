import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExportData } from 'src/app/models/export-data.interfaces';
import { OrderModel } from 'src/app/models/order.interfaces';
import { ProductModel } from 'src/app/models/product.interfaces';
import { OrderService } from 'src/app/services/rest/order.service';
import { ProductService } from 'src/app/services/rest/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ReceiveProductComponent } from '../receive-product/receive-product.component';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit, OnDestroy {
  @Input() products!: ProductModel[];
  selection = new SelectionModel<ProductModel>(true);
  formExport!:FormGroup;
  orders!:OrderModel[];
  exports: ExportData[]=[
    {id:1,value: 'Excel' },
    {id:2,value: 'PDF' }
  ]

  constructor(private dialog: MatDialog, 
    private productService: ProductService,
    private fb:FormBuilder,
    private orderService:OrderService) { }

  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
  }


  ngOnInit(): void {
    this.createFormCombobox();
    this.getAllOrders();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  createFormCombobox(){
    this.formExport = this.fb.group({
      filter: '',
      toExport: '',
    });
  }

  getAllOrders(){
    this.orderService.getAllByStatusZero().subscribe({
      next:(orders)=>this.orders=orders
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  openForm() {
    if(this.orders)this.dialog.open(ReceiveProductComponent,{data: this.orders});
  }
  displayedColumns: string[] = ['select', 'idProduct', 'name', 'stock','price', 'dateExpiration', 'image', 'sección'];
  dataSource = new MatTableDataSource<ProductModel>(this.products);

  onProductToggle(product: ProductModel) {
    this.selection.toggle(product);
  }

  isAllSelected() {

    return this.selection.selected?.length == this.products?.length;
  }
  toggleAll() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.products);
    }
  }
  delete() {
    for (const supplier in this.selection.selected) {
      this.productService.delete(this.selection.selected[supplier].id).subscribe({
        next: () => {
          console.log("eliminado");
        }
      })
    }
  }

  update() {
    const product = this.selection.selected[this.selection.selected.length - 1];
    if (product) this.dialog.open(ProductFormComponent, { data: product });
  }


}
