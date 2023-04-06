export interface Question {
  title: string;
  options: string[];
  correctOptionIndex: number;
}

export interface Auth {
  email: string;
  password: string;
}

export interface Quiz {
  title: string;
  description: string;
  points: number;
  questions: Question[];
  timeLimit: number;
}
