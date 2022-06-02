import { AfterViewInit,Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductModel } from 'src/app/models/product.interfaces';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {
  @Input() products!:ProductModel[];
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  openForm() {
    this.dialog.open(ProductFormComponent);
  }
  displayedColumns: string[] = ['idProduct','name','stock','dateExpiration','image','idCategory'];
  dataSource = new MatTableDataSource<ProductModel>(this.products);
  
}
