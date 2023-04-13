export interface Question {
  title: string;
  options: string[];
  correctOptionIndex: number;
}

export interface Auth {
  email: string;
  password: string;
  isStudent: string;
}

export interface UserData extends Omit<Auth, "password"> {}
export interface Quiz {
  title: string;
  description: string;
  points: number;
  questions: Question[];
  timeLimit: number;
}

export interface QuizDocument extends Quiz {
  id: string;
}

export function isQuizDocument(data: any): data is QuizDocument {
  return data.id !== undefined;
}
