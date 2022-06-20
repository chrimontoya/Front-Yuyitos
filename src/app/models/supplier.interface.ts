import { ContactModel } from "./contact.interfaces";
import { ItemModel } from "./item.interfaces";

export interface SupplierModel {
    id: number,
    rut: number,
    dv: string,
    name: string,
    item: ItemModel,
    contact:ContactModel
}