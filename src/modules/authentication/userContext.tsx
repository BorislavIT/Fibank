import { createContext, useState } from "react";
import { IUser, IUserContext, IUserProviderProps } from "./model";
import { useNavigate } from "react-router";
import { routerPaths } from "../../shared/constant";

export const UserContext = createContext<IUserContext>(undefined as never);

export function UserProvider(props: IUserProviderProps) {
  const { children } = props;

  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  const login = (username: string) => {
    setUser({ username: username });
    navigate(routerPaths.home);
  };

  return (
    <UserContext.Provider value={{ user, login }}>
      {children}
    </UserContext.Provider>
  );
}
