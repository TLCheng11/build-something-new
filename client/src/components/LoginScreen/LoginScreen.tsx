import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function LoginPage() {
  let navigate = useNavigate();
  const { currentUser, setcurrentUser } = useContext(UserContext);
  const [signUp, setSignUp] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser.id) {
      navigate("/marketplace/1");
    }
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {!signUp ? (
        <LoginForm setSignUp={setSignUp} />
      ) : (
        <SignUpForm setSignUp={setSignUp} />
      )}
    </div>
  );
}

export default LoginPage;
