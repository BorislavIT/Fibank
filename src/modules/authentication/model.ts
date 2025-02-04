import { ReactNode } from "react";

export interface IUser {
  username: string;
}

export interface IUserProviderProps {
  children: ReactNode;
}

export interface IUserContext {
  user: IUser | null;
  login: (username: string) => void;
}

export interface ILoginFormValues {
  username: string;
  password: string;
}
