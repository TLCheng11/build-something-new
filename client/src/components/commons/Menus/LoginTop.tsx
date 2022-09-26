import { useState } from "react";
import LoginScreen from "../../LoginScreen/LoginScreen";

function LoginTop() {
  const [showLogin, setShowLogin] = useState<boolean>(false);

  return (
    <div>
      <div
        className="cursor-pointer fixed flex items-end justify-start h-24 w-24 z-50 -top-12 -right-12 p-3 bg-green-600 rounded-full hover:scale-200 transition-all duration-300 ease-in"
        onClick={() => setShowLogin(!showLogin)}
      >
        <p className="absolute left-1 rotate-45">Login</p>
      </div>
      {showLogin && (
        <div className="fixed z-30">
          <LoginScreen setShowLogin={setShowLogin} />
        </div>
      )}
    </div>
  );
}

export default LoginTop;
