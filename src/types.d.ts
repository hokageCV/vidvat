export interface Question {
  title: string;
  options: string[];
  correctOptionIndex: number;
}

export interface Auth {
  email: string;
  password: string;
}
