import { createContext, ReactNode, useState } from "react";
import { ICurrentUser } from "../Interface";

interface Props {
  children: ReactNode;
}

export const UserContext = createContext<{
  currentUser: ICurrentUser;
  setcurrentUser: React.Dispatch<React.SetStateAction<ICurrentUser>>;
}>({
  currentUser: {},
  setcurrentUser: () => {},
});

export function UserProvider({ children }: Props) {
  const [currentUser, setcurrentUser] = useState<ICurrentUser>({});

  return (
    <UserContext.Provider value={{ currentUser, setcurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}
