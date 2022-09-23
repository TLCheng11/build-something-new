import { createContext, ReactNode, useState } from "react";
import { ICurrentUser } from "../Interface";

interface Props {
  children: ReactNode;
}

export const UserContext = createContext<{
  currentUser: ICurrentUser;
  setcurrentUser: React.Dispatch<React.SetStateAction<ICurrentUser>>;
  firstEnter: boolean;
  setfirstEnter: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  currentUser: {},
  setcurrentUser: () => {},
  firstEnter: true,
  setfirstEnter: () => {},
});

export function UserProvider({ children }: Props) {
  const [currentUser, setcurrentUser] = useState<ICurrentUser>({});
  const [firstEnter, setfirstEnter] = useState<boolean>(true);

  return (
    <UserContext.Provider
      value={{ currentUser, setcurrentUser, firstEnter, setfirstEnter }}
    >
      {children}
    </UserContext.Provider>
  );
}
