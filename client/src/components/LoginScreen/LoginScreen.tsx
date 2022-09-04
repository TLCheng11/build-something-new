import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICurrentUser } from "../../Interface";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

interface Props {
  currentUser: ICurrentUser;
  setcurrentUser: React.Dispatch<React.SetStateAction<ICurrentUser>>;
}

function LoginPage(props: Props) {
  let navigate = useNavigate();
  const { currentUser, setcurrentUser } = props;
  const [signUp, setSignUp] = useState<boolean>(false);

  if (currentUser.id) {
    navigate("/marketplace/1");
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {!signUp ? (
        <LoginForm setcurrentUser={setcurrentUser} setSignUp={setSignUp} />
      ) : (
        <SignUpForm setcurrentUser={setcurrentUser} setSignUp={setSignUp} />
      )}
    </div>
  );
}

export default LoginPage;
