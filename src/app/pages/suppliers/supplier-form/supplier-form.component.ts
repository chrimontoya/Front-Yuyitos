import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css']
})
export class SupplierFormComponent implements OnInit {
  supplierForm!:FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  createForm(){
    this.supplierForm=this.fb.group({
      nombres: '',
      apellidos: '',
    })
  }

}
