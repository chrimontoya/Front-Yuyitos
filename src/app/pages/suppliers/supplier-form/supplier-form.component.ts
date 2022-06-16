import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ItemModel } from 'src/app/models/item.interfaces';
import { ItemService } from 'src/app/services/rest/item.service';
import { SupplierService } from 'src/app/services/rest/supplier.service';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css']
})
export class SupplierFormComponent implements OnInit {
  supplierForm!: FormGroup;
  items!:ItemModel[];
  constructor(private fb: FormBuilder, private itemService: ItemService,private supplierService:SupplierService) { }

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
      phone: ''
    })
  }

  saveSupplier() {
    console.log(this.supplierForm.get('item')?.value);

  /*  const json = {

      rut: this.supplierForm.get('rut')?.value,
      dv: this.supplierForm.get('dv')?.value,
      name: this.supplierForm.get('name')?.value,
      item: {
        id:this.supplierForm.get('rut')?.value,
        name:"Ganadería"
      }
  }]
  


    this.supplierService.add(this.supplierForm.getRawValue()).subscribe({next:()=>{
      console.log("insertado");
    }});
    //console.log(this.supplierForm.getRawValue());*/
  }

  getAllItem() {
    this.itemService.getAll().subscribe({
      next: (items) => {
        this.items=items;
        console.log(items);
      },
    })
  }

}
