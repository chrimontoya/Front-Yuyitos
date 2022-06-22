import { CategoryTypeModel } from "./category-type-interfaces";

export interface ProductModel {
  id: number,
  name: string,
  stock: number,
  price:number,
  dateExpiration: Date,
  image: string,
  categoryType: CategoryTypeModel
}