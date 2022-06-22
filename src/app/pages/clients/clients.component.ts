import { Component, OnInit } from '@angular/core';
import { ClientModel } from 'src/app/models/client.interfaces';
import { ClientService } from 'src/app/services/rest/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  public clients!:ClientModel[];
  constructor(private clientService:ClientService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.clientService.getAll().subscribe({
      next: (clients)=> this.clients=clients,
    })
  }

}
