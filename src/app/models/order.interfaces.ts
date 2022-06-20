import { SupplierModel } from "./supplier.interface";

export interface OrderModel {
    id: number,
    dateCreate:Date,
    status: boolean,
    supplier:SupplierModel,
}