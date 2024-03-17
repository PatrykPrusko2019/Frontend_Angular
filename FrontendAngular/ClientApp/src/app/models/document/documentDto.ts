import { LabelDto } from "../label/labelDto";
import { ProductDto } from "../product/productDto";

export interface DocumentDto {
  id: number;
  targetWarehouse: string; // storage
  vendor: string; // provider
  providerId: string;
  storageId: string;
  products: [ProductDto],
  labels: [LabelDto],

  labelNames: string,
  approvedDocument: string
}
