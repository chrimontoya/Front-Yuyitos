import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit,Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SupplierModel } from 'src/app/models/supplier.interface';
import { SupplierFormComponent } from '../supplier-form/supplier-form.component';


@Component({
  selector: 'app-supplier-table',
  templateUrl: './supplier-table.component.html',
  styleUrls: ['./supplier-table.component.css']
})
export class SupplierTableComponent implements OnInit {
  selection = new SelectionModel<SupplierModel>(true);
  @Input() suppliers!:SupplierModel[];
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.suppliers);
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  openForm() {
    this.dialog.open(SupplierFormComponent);
  }
  displayedColumns: string[] = ['select','id','rut','dv','name','item','email','phone'];
  dataSource = new MatTableDataSource<SupplierModel>(this.suppliers);

  onSupplierToggle(supplier:SupplierModel){
    this.selection.toggle(supplier);
    console.log(this.selection.selected);
  }

  isAllSelected(){

    return this.selection.selected?.length == this.suppliers?.length;
  }
  toggleAll(){
    //console.log(this.suppliers);
      if(this.isAllSelected()){
        this.selection.clear();
      }else{
        this.selection.select(...this.suppliers);
      }
  }
}
