import { Component, OnInit } from '@angular/core';
import { ContactModel } from 'src/app/models/contact.interfaces';
import { SupplierModel } from 'src/app/models/supplier.interface';
import { ContactService } from 'src/app/services/rest/contact.service';
import { SupplierService } from 'src/app/services/rest/supplier.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css'],
})
export class SuppliersComponent implements OnInit {
  suppliers!: SupplierModel[];
  contacts!: ContactModel[];
  constructor(private supplierService: SupplierService,private contactService:ContactService) {}

  ngOnInit(): void {
    this.getAllSuppliers();
    this.getAllContacts();
  }

  getAllSuppliers() {
    this.supplierService.getAll().subscribe({
      next: (suppliers:SupplierModel[]) => {
        this.suppliers=suppliers; 
      }
    });
  }

  getAllContacts(){
    this.contactService.getAll().subscribe({
      next: (contacts:ContactModel[])=>{
        this.contacts=contacts;
      }
    })
  }
}
