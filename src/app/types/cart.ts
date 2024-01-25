import { IProduct } from "./product";

export interface IItem {
  id: string;
  product: IProduct;
  units: number;
  color: string;
  style: string;
  size: string;
  location: string;
  weight: string;
}
