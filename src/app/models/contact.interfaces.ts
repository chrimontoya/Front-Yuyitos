import { SupplierModel } from "./supplier.interface";

export interface ContactModel {
    id:number,
    email:string,
    phone:number,
    supplier:number
}