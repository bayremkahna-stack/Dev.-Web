export interface Question {
  id: number;
  question: string;
  options: string[];
  reponse: string;
  repondu?: boolean;
  reponseChoisie?: string;
}
