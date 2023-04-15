export interface Question {
  title: string;
  options: string[];
  correctOptionIndex: number;
}

export interface Auth {
  email: string;
  password: string;
  userType: string;
}

export interface ScoreData {
  quizId: string;
  score: number;
}
export interface UserData extends Omit<Auth, "password"> {
  quizes: Quiz[];
  scores: ScoreData[];
}
export interface Quiz {
  title: string;
  description: string;
  points: number;
  questions: Question[];
  timeLimit: number;
  ownerEmail: string;
}

export interface QuizDocument extends Quiz {
  id: string;
}

export function isQuizDocument(data: any): data is QuizDocument {
  return data.id !== undefined;
}
