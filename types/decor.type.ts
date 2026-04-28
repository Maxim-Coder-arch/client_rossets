export interface IAdditionalField {
  id: number;
  label: string;
  value: string;
}

export interface IDecor {
  _id: string;
  title: string;
  description: string;
  price: number;
  mainImage: string;
  additionalImages: string[];
  additionalFields: IAdditionalField[];
  createdAt: string;
}