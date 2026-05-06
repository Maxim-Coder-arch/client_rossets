export interface IBidFormSectionUiProps {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  formData: {
    name: string;
    contact: string;
    socialLink: string;
    comment: string;
  };
  isLoading: boolean;
  setAgreed: React.Dispatch<React.SetStateAction<boolean>>;
  message: { type: "success" | "error"; text: string } | null;
  agreed: boolean;
}