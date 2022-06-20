import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductModel } from 'src/app/models/product.interfaces';
import { ProductService } from 'src/app/services/rest/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit, OnDestroy {
  @Input() products!: ProductModel[];
  selection = new SelectionModel<ProductModel>(true);
  constructor(private dialog: MatDialog, private productService: ProductService) { }

  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
  }


  ngOnInit(): void {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  openForm() {
    this.dialog.open(ProductFormComponent);
  }
  displayedColumns: string[] = ['select', 'idProduct', 'name', 'stock', 'dateExpiration', 'image', 'sección'];
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
