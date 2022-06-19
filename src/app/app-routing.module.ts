import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './pages/clients/clients.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsComponent } from './pages/products/products.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SalesComponent } from './pages/sales/sales.component';
import { SuppliersComponent } from './pages/suppliers/suppliers.component';

const routes: Routes = [{
  path: 'inicio',
  component: HomeComponent,
},{
  path:'ventas',
  component: SalesComponent
},{
  path: 'clientes',
  component: ClientsComponent
},{
  path: 'proveedores',
  component: SuppliersComponent
},{
  path: 'inventario',
  component: ProductsComponent
},{
  path: 'pedidos',
  component: OrdersComponent
},{
  path: 'informes',
  component: ReportsComponent
},{
  path: 'login',
  component: LoginComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
