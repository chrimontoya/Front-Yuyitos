import { OrderModel } from "./order.interfaces";
import { ProductModel } from "./product.interfaces";

export interface OrderDetailsModel {
    id:number,
    stock:number,
    price:number,
    dateExpiration: Date,
    order:OrderModel,
    product:ProductModel,
}