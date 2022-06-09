import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatTreeModule} from '@angular/material/tree';
import { SalesComponent } from './pages/sales/sales.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { SuppliersComponent } from './pages/suppliers/suppliers.component';
import { ProductsComponent } from './pages/products/products.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ClientFormComponent } from './pages/clients/client-form/client-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { ProductTableComponent } from './pages/products/product-table/product-table.component';
import { ClientTableComponent } from './pages/clients/client-table/client-table.component';
import { SupplierFormComponent } from './pages/suppliers/supplier-form/supplier-form.component';
import { SupplierTableComponent } from './pages/suppliers/supplier-table/supplier-table.component';
import { OrderFormComponent } from './pages/orders/order-form/order-form.component';
import { OrderTableComponent } from './pages/orders/order-table/order-table.component';
import { SaleFormComponent } from './pages/sales/sale-form/sale-form.component';
import { ReportFormComponent } from './pages/reports/report-form/report-form.component';
import { ReportTableComponent } from './pages/reports/report-table/report-table.component';
import { SaleTableComponent } from './pages/sales/sale-table/sale-table.component';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    SalesComponent,
    ClientsComponent,
    SuppliersComponent,
    ProductsComponent,
    OrdersComponent,
    ReportsComponent,
    ClientFormComponent,
    ProductFormComponent,
    ProductTableComponent,
    ClientTableComponent,
    SupplierFormComponent,
    SupplierTableComponent,
    OrderFormComponent,
    OrderTableComponent,
    SaleFormComponent,
    SupplierFormComponent,
    SupplierTableComponent,
    ReportFormComponent,
    ReportTableComponent,
    SaleTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    MatDividerModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTreeModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
