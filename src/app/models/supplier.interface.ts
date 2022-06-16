import { ItemModel } from "./item.interfaces";

export interface SupplierModel {
    id: Number,
    rut: Number,
    dv: String,
    name: String,
    item: ItemModel,
    contact: Object,
}