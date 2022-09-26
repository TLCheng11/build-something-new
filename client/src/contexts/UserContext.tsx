import { createContext, ReactNode, useState } from "react";
import { ICurrentUser } from "../Interface";

interface Props {
  children: ReactNode;
}

export const UserContext = createContext<{
  currentUser: ICurrentUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<ICurrentUser>>;
  firstEnter: boolean;
  setFirstEnter: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  currentUser: {},
  setCurrentUser: () => {},
  firstEnter: true,
  setFirstEnter: () => {},
});

export function UserProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<ICurrentUser>({});
  const [firstEnter, setFirstEnter] = useState<boolean>(true);

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, firstEnter, setFirstEnter }}
    >
      {children}
    </UserContext.Provider>
  );
}
