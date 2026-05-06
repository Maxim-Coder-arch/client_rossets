import { JSX } from "react";

export interface IFooterDataProps {
  contacts: {
    icon: JSX.Element;
    link: string;
  }[];
  menu: {
    label: string;
    link: string;
  }[];
  additionaly: {
    label: string;
    link: string;
  }[];
  developer: {
    label: string;
    link: string;
  }[]
}