import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExportData } from 'src/app/models/export-data.interfaces';
import { OrderModel } from 'src/app/models/order.interfaces';
import { OrderDetailsModel } from 'src/app/models/orderDetails.interfaces';
import { ProductModel } from 'src/app/models/product.interfaces';
import { OrderDetailsService } from 'src/app/services/rest/order-details.service';
import { OrderService } from 'src/app/services/rest/order.service';
import { OrderFormComponent } from '../order-form/order-form.component';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css']
})
export class OrderTableComponent implements OnInit, OnDestroy {
  @Input() orders!: OrderModel[];
  @Input() orderDetails!: OrderDetailsModel[];
  selection = new SelectionModel<OrderDetailsModel>(true);
  formExport!:FormGroup;
  exports: ExportData[]=[
    {id:1,value: 'Excel' },
    {id:2,value: 'PDF' }
  ]
  constructor(private dialog: MatDialog,
    private orderDetailsService:OrderDetailsService,
    private fb:FormBuilder) { }

  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
  }


  ngOnInit(): void {
    this.createFormCombobox();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  openForm() {
    this.dialog.open(OrderFormComponent);
  }
  displayedColumns: string[] = ['select', 'orden', 'id','product', 'stock', 'price','supplier','dateExpirate','dateCreate','status'];
  dataSource = new MatTableDataSource<OrderDetailsModel>(this.orderDetails);


  createFormCombobox(){
    this.formExport = this.fb.group({
      filter: '',
      toExport: '',
    });
  }

  onProductToggle(orderDetails: OrderDetailsModel) {
    this.selection.toggle(orderDetails);
  }

  isAllSelected() {

    return this.selection.selected?.length == this.orderDetails?.length;
  }
  toggleAll() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.orderDetails);
    }
  }
  delete() {
    //HAY QUE BORRAR LAS ORDENES SI NO HAY DETALLES
    for (const order in this.selection.selected) {
      this.orderDetailsService.delete(this.selection.selected[order].id).subscribe({
        next:()=>{
          console.log("eliminado");
        }
      })
    }
  }

  update() {
    const details = this.selection.selected[this.selection.selected.length - 1];
    if (details) this.dialog.open(OrderFormComponent, { data: details });
  }


}
