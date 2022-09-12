import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import Intro from "../Intro/Intro";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function LoginPage() {
  let navigate = useNavigate();
  const { currentUser, setcurrentUser } = useContext(UserContext);
  const [signUp, setSignUp] = useState<boolean>(false);
  const [showForms, setshowForms] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser.id) {
      navigate("/marketplace/1");
    }
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      setshowForms(true);
    }, 31000);

    return () => clearInterval(id);
  });

  return (
    <div
      className="h-screen w-screen flex items-center justify-center"
      onClick={() => setshowForms(true)}
    >
      <div className="fixed h-screen w-screen">
        <Intro />
      </div>
      <div
        className={`z-10 ${
          showForms ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500 ease-in`}
      >
        {!signUp ? (
          <LoginForm setSignUp={setSignUp} />
        ) : (
          <SignUpForm setSignUp={setSignUp} />
        )}
      </div>
    </div>
  );
}

export default LoginPage;
