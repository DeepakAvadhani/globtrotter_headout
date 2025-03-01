interface Destination {
  id?: string;
  city: string;
  country: string;
  clues: string[];
  fun_fact: string[];
  trivia: string[];
  image?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}
