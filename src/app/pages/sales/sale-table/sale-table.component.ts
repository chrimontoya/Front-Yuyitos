import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExportData } from 'src/app/models/export-data.interfaces';
import { ProductModel } from 'src/app/models/product.interfaces';
import { SaleAndDetailsModel } from 'src/app/models/sale-and-details.interfaces';
import { SaleModel } from 'src/app/models/sale.interfaces';
import { SaleDetailsModel } from 'src/app/models/saleDetails.interfaces';
import { SaleDetailsService } from 'src/app/services/rest/sale-details.service';
import { SaleService } from 'src/app/services/rest/sale.service';
import { SaleFormComponent } from '../sale-form/sale-form.component';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
@Component({
  selector: 'app-sale-table',
  templateUrl: './sale-table.component.html',
  styleUrls: ['./sale-table.component.css']
})
export class SaleTableComponent implements OnInit {
  @Input() sales!: SaleModel[];
  @Input() saleAndDetails!: SaleAndDetailsModel[];

  selection = new SelectionModel<SaleAndDetailsModel>(true);
  formExport!:FormGroup;
  exports: ExportData[]=[
    {id:1,value: 'Excel' },
    {id:2,value: 'PDF' }
  ]
  constructor(private dialog: MatDialog,
    private saleService: SaleService,
    private saleDetailsService:SaleDetailsService,
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
    this.dialog.open(SaleFormComponent);
  }
  displayedColumns: string[] = ['select', 'id', 'idDetail', 'client', 'product', 'stock', 'price', 'dateCreation', 'fiado'];
  dataSource = new MatTableDataSource<SaleAndDetailsModel>(this.saleAndDetails);
  
  createFormCombobox(){
    this.formExport = this.fb.group({
      filter: '',
      toExport: '',
    });
  }

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

  exportData(){
    const details = this.selection.selected;
    if (details.length > 0) {
      const doc = new jsPDF();

      const idSale: any[] = [];
      details.map((sale) => {
        const res = idSale.find((id) => id == sale.idSale);
        res ? null : idSale.push(sale.idSale.toString());
      });

      const data:any[]= []
      for (const i in idSale) {

        const current:any[]=[];
        const res = details.filter((sale)=>{
          if(sale.idSale==idSale[i]){
            const {idSaleDetail,name,lastName,lastNameMother,nameProduct,stock,price,dateCreation,fiado}= sale;
            current.push([idSaleDetail,name+" "+lastName+" "+lastNameMother,nameProduct,stock,price,dateCreation,fiado==1?"No":"Si"])
          }
        });
        data.push(current);

      }

      for (const i in idSale){
        const head = [['ID detalle','cliente','producto','cantidad','precio','dateCreation','fiado','Venta: #'+idSale[i]]]

        const arr:any[] =[];

        for (const j in data[i]) {
            arr.push(Object.values(data[i][j]));
        }
        
          autoTable(doc, {
              head: head,
              body:arr,
              didDrawCell: (data) => { 
                
              },              
          });
      }

      

      doc.save("ventas_generadas.pdf");
   
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
