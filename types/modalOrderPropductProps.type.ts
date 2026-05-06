import { IProduct } from "./product.type";

export interface ModalOrderProductProps {
  product: IProduct;
  onClose: () => void;
}