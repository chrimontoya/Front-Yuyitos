import { CategoryModel } from "./category.interfaces";

export interface CategoryTypeModel {
    id:number,
    name:string,
    categoria:CategoryModel
}