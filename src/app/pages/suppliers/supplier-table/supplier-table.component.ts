import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { SupplierModel } from 'src/app/models/supplier.interface';
import { SupplierService } from 'src/app/services/rest/supplier.service';
import { SupplierFormComponent } from '../supplier-form/supplier-form.component';


@Component({
  selector: 'app-supplier-table',
  templateUrl: './supplier-table.component.html',
  styleUrls: ['./supplier-table.component.css']
})
export class SupplierTableComponent implements OnInit,OnDestroy {
  selection = new SelectionModel<SupplierModel>(true);

  @Input() suppliers!: SupplierModel[];
  constructor(private dialog: MatDialog, private supplierService: SupplierService) { }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  openForm() {
    this.dialog.open(SupplierFormComponent);
  }
  displayedColumns: string[] = ['select', 'id', 'rut', 'dv', 'name', 'item', 'email', 'phone'];
  dataSource = new MatTableDataSource<SupplierModel>(this.suppliers);

  onSupplierToggle(supplier: SupplierModel) {
    this.selection.toggle(supplier);
    console.log(this.selection.selected);
  }

  isAllSelected() {

    return this.selection.selected?.length == this.suppliers?.length;
  }
  toggleAll() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.suppliers);
    }
  }

  delete() {
  /* this.supplierService.delete(this.selection.selected[0].id).subscribe({
      next: () => {
      }
    })*/
    for (const id in this.selection.selected) {
      this.supplierService.delete(parseInt(id)).subscribe({
        next: () => {
        }
      })
    }
  }

}
