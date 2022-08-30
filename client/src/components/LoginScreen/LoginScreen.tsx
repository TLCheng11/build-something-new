import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

interface Props {
  currentUser: {
    id?: number | undefined;
    email?: string | undefined;
    username?: string | undefined;
    first_name?: string | undefined;
    last_name?: string | undefined;
    dob?: Date | undefined;
    profile_img?: string | undefined;
    introduction?: string | undefined;
    is_login?: boolean | undefined;
  };
  setcurrentUser: React.Dispatch<
    React.SetStateAction<{
      id?: number | undefined;
      email?: string | undefined;
      username?: string | undefined;
      first_name?: string | undefined;
      last_name?: string | undefined;
      dob?: Date | undefined;
      profile_img?: string | undefined;
      introduction?: string | undefined;
      is_login?: boolean | undefined;
    }>
  >;
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
