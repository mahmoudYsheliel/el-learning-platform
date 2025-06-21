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

export interface UpdatProgramCourseCategoryPlan {
  title?: TwoLang,
  category?: TwoLang,
  description?: TwoLang,
  image?: string,
  price?: number,
  min_age?: number,
  max_age?: number
}

export interface User {
  email: string,
  created_at?: string,
  phone_number?: string,
  first_name?: string,
  last_name?: string,
  birth_day?: string,
  gender?: string,
  image?: string,
}
export interface Instructor {
  title?: string,
  specializations?: string[],
  biography?: string,
  education_background?: string[],
  experience?: string[],
  philisophy?: string,
  courses?: string[]
}


export interface RoadMapCourse {
  id: string
  week_start?: number
  week_end?: number
}
export interface Level {
  id?: number
  title: TwoLang
  image: string
  courses?: string[]
}
export interface Track {
  id: number
  title: TwoLang
  description: TwoLang
  female_image?: string
  male_image?: string
  image?: string
  video?: string
  levels?: Level[]
  courses?: string[]
  min_age?: number
  max_age?: number
}

export interface Program {
  id?:string
  title: TwoLang
  description: TwoLang
  min_age?: number
  max_age?: number
  road_map?: RoadMapCourse[]
  image: string |TwoLang
  tracks?:Track[]
}