import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ContactModel } from 'src/app/models/contact.interfaces';
import { SupplierModel } from 'src/app/models/supplier.interface';
import { SupplierService } from 'src/app/services/rest/supplier.service';
import { SupplierFormComponent } from '../supplier-form/supplier-form.component';


@Component({
  selector: 'app-supplier-table',
  templateUrl: './supplier-table.component.html',
  styleUrls: ['./supplier-table.component.css']
})
export class SupplierTableComponent implements OnInit, OnDestroy {
  selection = new SelectionModel<SupplierModel>(true);

  @Input() suppliers!: SupplierModel[];
  @Input() contacts!: ContactModel[];
  supplierTable!: SupplierModel[];
  constructor(private dialog: MatDialog, private supplierService: SupplierService) { }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.generateDataTable();
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  generateDataTable() {
    const arr: SupplierModel[] = [];
    for (const key in this.contacts) {
      this.suppliers.filter((supplier) => {
        if (supplier.id == this.contacts[key].supplier) {
          const { id, dv, item, name, rut } = supplier;
          const obj = { id, rut, dv, name, item, contact: this.contacts[key] };
          arr.push(obj);
        }
      });
    }
    this.suppliers = arr;
  }

  openForm() {
    this.dialog.open(SupplierFormComponent);
  }
  displayedColumns: string[] = ['select', 'id', 'rut', 'dv', 'name', 'item', 'email', 'phone'];
  dataSource = new MatTableDataSource<SupplierModel>(this.suppliers);


  onSupplierToggle(supplier: SupplierModel) {
    this.selection.toggle(supplier);
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
    for (const supplier in this.selection.selected) {
      this.supplierService.delete(this.selection.selected[supplier].id).subscribe({
        next: () => {
          console.log("eliminado");
        }
      })
    }
  }

  update() {
    const supplier = this.selection.selected[this.selection.selected.length - 1];

    if (supplier) this.dialog.open(SupplierFormComponent, { data: supplier });
  }

}
