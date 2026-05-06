interface IHeroUiDataProps {
  title: string;
  description: string;
}

export interface IHeroSetionProps {
  data: IHeroUiDataProps[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
}