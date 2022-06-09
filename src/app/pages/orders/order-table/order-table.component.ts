import { SelectionModel } from '@angular/cdk/collections';
import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrderDetailsModel } from 'src/app/models/orderDetails.interfaces';
import { SupplierModel } from 'src/app/models/supplier.interface';
import { OrderFormComponent } from '../order-form/order-form.component';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css'],
})
export class OrderTableComponent implements OnInit {
  selection = new SelectionModel<OrderDetailsModel>(true);
  @Input() orderDetails!: OrderDetailsModel[];
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  openForm() {
    this.dialog.open(OrderFormComponent);
  }
  displayedColumns: string[] = [
    'id',
    'order',
    'product',
    'nameProduct',
    'stock',
    'price',
    'dateExpiration',
  ];
  dataSource = new MatTableDataSource<OrderDetailsModel>(this.orderDetails);

  onSupplierToggle(orderDetails: OrderDetailsModel) {
    this.selection.toggle(orderDetails);
    console.log(this.selection.selected);
  }

  isAllSelected() {
    return this.selection.selected?.length == this.orderDetails?.length;
  }
  toggleAll() {
    console.log(this.orderDetails);
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.orderDetails);
    }
  }
}
