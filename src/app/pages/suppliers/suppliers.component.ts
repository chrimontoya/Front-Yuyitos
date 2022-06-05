import { Component, OnInit } from '@angular/core';
import { SupplierModel } from 'src/app/models/supplier.interface';
import { SupplierService } from 'src/app/services/rest/supplier.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
})
export class SuppliersComponent implements OnInit {
  suppliers!: SupplierModel[];
  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.supplierService.getAll().subscribe({
      next: (suppliers:SupplierModel[]) => this.suppliers=suppliers
    });
  }
}
