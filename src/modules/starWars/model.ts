export interface ISwapiResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export interface IPeopleResponse {
  count: number;
  next: string;
  previous: string | null;
  results: IPerson[];
}

export interface IPerson {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
}

export interface IPeopleTableProps {
  people: IPerson[];
}
