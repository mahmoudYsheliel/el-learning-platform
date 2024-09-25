export interface TwoLang {
  en: string;
  ar: string;
}
export interface Item {
  id: number;
  text: TwoLang;
  description: TwoLang | null;
  image: string | null;
}
export interface ItemsSet {
  items: Item[];
  start_images: string[];
  end_images: string[];
}

export interface Choice {
  id: number;
  choice: TwoLang;
}

export interface Question {
  id: number;
  question: TwoLang;
  choices: Choice[];
  correct_answer_id: number;
}

export interface UpdatProgramCourseCategoryPlan{
    title?:TwoLang,
    category?:TwoLang,
    description?:TwoLang,
    image?:string,
    price?:number,
    min_age?:number,
    max_age?:number
}
