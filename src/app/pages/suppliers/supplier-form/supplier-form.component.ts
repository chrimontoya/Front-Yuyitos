import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { ContactModel } from 'src/app/models/contact.interfaces';
import { ItemModel } from 'src/app/models/item.interfaces';
import { SupplierModel } from 'src/app/models/supplier.interface';
import { ContactService } from 'src/app/services/rest/contact.service';
import { ItemService } from 'src/app/services/rest/item.service';
import { SupplierService } from 'src/app/services/rest/supplier.service';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css']
})
export class SupplierFormComponent implements OnInit {
  supplierForm!: FormGroup;
  items!: ItemModel[];
  selectedItem!: MatSelectChange;
  supplierId!:number;
  constructor(private fb: FormBuilder, private itemService: ItemService, private supplierService: SupplierService, private contactService: ContactService) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllItem();
  }

  createForm() {
    this.supplierForm = this.fb.group({
      rut: '',
      dv: '',
      name: '',
      email: '',
      phone: '',
      test: ''
    })
  }

  getSelectedItem(event: MatSelectChange) {
    this.selectedItem = event;
  }

  saveSupplier() {
    //console.log(this.supplierForm.get('item')?.value);

    const supplier = {

      rut: this.supplierForm.get('rut')?.value,
      dv: this.supplierForm.get('dv')?.value,
      name: this.supplierForm.get('name')?.value,
      item: {
        id: this.selectedItem.value
      },

    } as SupplierModel;

    this.supplierService.add(supplier).subscribe({
      next: (supplier) => {
        console.log(supplier);
        const contact = {
          email: this.supplierForm.get('email')?.value,
          phone: this.supplierForm.get('phone')?.value,
          supplier: supplier
        } as ContactModel;
        
        this.contactService.add(contact).subscribe({
          next:()=>{console.log("insert contact");}
        });
      }
    })

    
    
  }

  getAllItem() {
    this.itemService.getAll().subscribe({
      next: (items) => {
        this.items = items;
        console.log(items);
      },
    })
  }

}
