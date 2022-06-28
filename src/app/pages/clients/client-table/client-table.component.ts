import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit,Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClientModel } from 'src/app/models/client.interfaces';
import { ClientFormComponent } from '../client-form/client-form.component';


@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrls: ['./client-table.component.css']
})

export class ClientTableComponent implements OnInit {
  @Input() clients!:ClientModel[];
  selection = new SelectionModel<ClientModel>(true);
  constructor(private dialog: MatDialog) { }

  ngOnDestroy(): void {
    //throw new Error('Method not implemented.');
  }


  ngOnInit(): void {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  openForm() {
    this.dialog.open(ClientFormComponent);
  }
  displayedColumns: string[] = ['select', 'id', 'rut','dv', 'name', 'lastName','lastNameMother','fiado'];
  dataSource = new MatTableDataSource<ClientModel>(this.clients);


  isAllSelected() {

    return this.selection.selected?.length == this.clients?.length;
  }

  onClientToggle(client: ClientModel) {
    this.selection.toggle(client);
  }

  toggleAll() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.clients);
    }
  }
  // delete() {
  //   //HAY QUE BORRAR LAS ORDENES SI NO HAY DETALLES
  //   for (const order in this.selection.selected) {
  //     this.orderDetailsService.delete(this.selection.selected[order].id).subscribe({
  //       next:()=>{
  //         console.log("eliminado");
  //       }
  //     })
  //   }
  // }

  // update() {
  //   const details = this.selection.selected[this.selection.selected.length - 1];
  //   if (details) this.dialog.open(OrderFormComponent, { data: details });
  // }

}
