export type Character = {
  id: number;
  created: Date;
  episode: string[];
  gender: string;
  image: string;
  location: {
    name: string;
    url: string;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
  type: string;
  url: string;
};

export type Characters = {
  info: {
    count: number;
    pages: number;
    next: number | null;
    prev: number | null;
  };
  results: Character[];
};