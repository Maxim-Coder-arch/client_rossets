import { IDecor } from "./decor.type";

export interface ModalOrderDecorProps {
  product: IDecor;
  onClose: () => void;
}