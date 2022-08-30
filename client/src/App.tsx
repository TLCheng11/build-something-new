import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import DesignPage from "./components/DesignPage/DesignPageLayout/DesignPage";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const [currentUser, setcurrentUser] = useState<{
    id?: number;
    email?: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    dob?: Date;
    profile_img?: string;
    introduction?: string;
    is_login?: boolean;
  }>({});

  // only authorize logged in users
  useEffect(() => {
    fetch("/auth").then((res) => {
      if (res.ok) {
        res
          .json()
          .then((user) => {
            // console.log(user)
            setcurrentUser(user);
          })
          .catch(console.error);
      }
    });
  }, []);

  if (!currentUser.id)
    return (
      <LoginScreen currentUser={currentUser} setcurrentUser={setcurrentUser} />
    );

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard currentUser={currentUser} />} />
          <Route
            path="/design-page"
            element={<DesignPage currentUser={currentUser} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
