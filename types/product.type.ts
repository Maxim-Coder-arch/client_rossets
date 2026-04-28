export interface IProduct {
  _id: string;
  image: string;
  additionalImages: string[];
  seriesId: string;
  seriesNumber: string;
  rossetSeries: string;
  rossetNumber: number;
  rossetDiameter: number;
  numberOfTails: number;
  tailLength: number;
  comment: string;
  price: number;
}