import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { DialogMessageFailureComponent } from 'src/app/components/dialogs/dialog-message-failure/dialog-message-failure.component';
import { DialogMessageSuccessComponent } from 'src/app/components/dialogs/dialog-message-success/dialog-message-success.component';
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
  supplierId!: number;
  constructor(private form:FormBuilder,
    private itemService: ItemService,
    private supplierService: SupplierService,
    private contactService: ContactService,
    @Inject(MAT_DIALOG_DATA) public supplier: SupplierModel,public dialog:MatDialog) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllItem();
  }

  createForm() {
    this.supplierForm = this.form.group({
      rut: [this.supplier?this.supplier.rut:'',[Validators.maxLength(9),Validators.minLength(8)]],
      dv: [this.supplier?this.supplier.dv:'',[Validators.maxLength(1)]],
      name: [this.supplier?this.supplier.name:'',[Validators.maxLength(45)]],
      email: [this.supplier?this.supplier.contact.email:'',[Validators.email]],
      phone: [this.supplier?this.supplier.contact.phone:'',[Validators.maxLength(9),Validators.minLength(8)]],
      item: [this.supplier?this.supplier.item.id:'']
    })
  }

  getSelectedItem(event: MatSelectChange) {
    this.selectedItem = event;
  }

  showMessageSuccess(){
    this.dialog.open(DialogMessageSuccessComponent,{position: {top: '0%'}});
  }

  showMessageFailure(){
    this.dialog.open(DialogMessageFailureComponent,{position: {top: '0%'}});
  }

  saveSupplier() {

    const supplier = {
      id: this.supplier ? this.supplier.id : null,
      rut: this.supplierForm.get('rut')?.value,
      dv: this.supplierForm.get('dv')?.value,
      name: this.supplierForm.get('name')?.value,
      item: {
        id: this.supplier ? this.supplier.item.id : this.supplierForm.get('item')?.value
      }
    } as SupplierModel;

    this.supplierService.add(supplier).subscribe({
      next: (supplier) => {
        const contact = {
          id: this.supplier ? this.supplier.contact.id : null,
          email: this.supplierForm.get('email')?.value,
          phone: this.supplierForm.get('phone')?.value,
          supplier: this.supplier ? this.supplier.id : supplier
        } as ContactModel;
    
        this.contactService.add(contact).subscribe({
          next: () => {
            this.showMessageSuccess();
          },
          error: ()=>this.showMessageFailure(),
        })
      },
      error: ()=>this.showMessageFailure(),
    });

    
  }

  getAllItem() {
    this.itemService.getAll().subscribe({
      next: (items) => {
        this.items = items;
      },
    })
  }

}
