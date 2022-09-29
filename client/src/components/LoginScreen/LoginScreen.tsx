import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import Intro from "../Intro/Intro";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

interface Props {
  setShowLogin?: React.Dispatch<React.SetStateAction<boolean>>;
}

function LoginPage({ setShowLogin }: Props) {
  let navigate = useNavigate();
  const { currentUser, firstEnter, setFirstEnter } = useContext(UserContext);
  const [signUp, setSignUp] = useState<boolean>(false);
  const [showForms, setShowForms] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser.id) {
      setFirstEnter(false);
      navigate("/marketplace/1");
    }

    const id = setTimeout(() => {
      setShowForms(true);
    }, 31000);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!firstEnter) {
      setShowForms(true);
    }
  }, []);

  return (
    <div
      className="h-screen w-screen flex items-center justify-center"
      onClick={() => setShowForms(true)}
    >
      {firstEnter ? (
        <div className="fixed h-screen w-screen">
          <Intro />
        </div>
      ) : (
        <div
          className="fixed h-screen w-screen bg-stone-900 opacity-50"
          onClick={() => {
            if (setShowLogin) {
              setShowLogin((state) => !state);
            }
          }}
        ></div>
      )}
      <div
        className={`w-1/4 min-w-360 z-10 ${
          showForms
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
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
