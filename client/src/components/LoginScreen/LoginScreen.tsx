import { useState } from "react";
import { ICurrentUser } from "../../Interface";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

interface Props {
  currentUser: ICurrentUser;
  setcurrentUser: React.Dispatch<React.SetStateAction<ICurrentUser>>;
}

function LoginPage(props: Props) {
  const { currentUser, setcurrentUser } = props;
  const [signUp, setSignUp] = useState<boolean>(false);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {!signUp ? (
        <LoginForm setcurrentUser={setcurrentUser} setSignUp={setSignUp} />
      ) : (
        <SignUpForm
          currentUser={currentUser}
          setcurrentUser={setcurrentUser}
          setSignUp={setSignUp}
        />
      )}
    </div>
  );
}

export default LoginPage;
