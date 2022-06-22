import { ClientModel } from "./client.interfaces";

export interface SaleModel {
    id: number,
    dateCreation: Date,
    client: ClientModel
}