import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductModel } from 'src/app/models/product.interfaces';
import { SaleAndDetailsModel } from 'src/app/models/sale-and-details.interfaces';
import { SaleModel } from 'src/app/models/sale.interfaces';
import { SaleDetailsModel } from 'src/app/models/saleDetails.interfaces';
import { SaleDetailsService } from 'src/app/services/rest/sale-details.service';
import { SaleService } from 'src/app/services/rest/sale.service';
import { SaleFormComponent } from '../sale-form/sale-form.component';

@Component({
  selector: 'app-sale-table',
  templateUrl: './sale-table.component.html',
  styleUrls: ['./sale-table.component.css']
})
export class SaleTableComponent implements OnInit {
  @Input() sales!: SaleModel[];
  @Input() saleAndDetails!: SaleAndDetailsModel[];

  selection = new SelectionModel<SaleAndDetailsModel>(true);
  constructor(private dialog: MatDialog,
    private saleService: SaleService,
    private saleDetailsService:SaleDetailsService) { }

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
    this.dialog.open(SaleFormComponent);
  }
  displayedColumns: string[] = ['select', 'id', 'idDetail', 'client', 'product', 'stock', 'price', 'dateCreation', 'fiado'];
  dataSource = new MatTableDataSource<SaleAndDetailsModel>(this.saleAndDetails);

  isAllSelected() {
    return this.selection.selected?.length == this.saleAndDetails?.length;
  }

  onDetailToggle(saleAndDetails: SaleAndDetailsModel) {
    this.selection.toggle(saleAndDetails);
  }

  toggleAll() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.saleAndDetails);
    }
  }

   delete() {
     //HAY QUE BORRAR LAS VENTAS SI NO HAY DETALLES
     for (const saleDetails in this.selection.selected) {

        this.saleDetailsService.delete(this.selection.selected[saleDetails].idSaleDetail).subscribe({
          next:()=>{
            console.log("eliminado");
          }
        })
      }
      
   }

   update() {
     const details = this.selection.selected[this.selection.selected.length - 1];
     if (details) this.dialog.open(SaleFormComponent, { data: details });
  }


}
