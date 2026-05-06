import { IDecor } from "./decor.type";
import { ISeries } from "./series.type";

export interface IMiniCatalogUiProps {
  seriesData: ISeries[];
  decorsData: IDecor[];
  activeCategory: "ready" | "decor";
  setActiveCategory: React.Dispatch<React.SetStateAction<"ready" | "decor">>;
}