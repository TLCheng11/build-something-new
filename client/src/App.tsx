import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import DesignPage from "./components/DesignPage/DesignPageLayout/DesignPage";
import Dashboard from "./components/Dashboard/Dashboard";
import { ICurrentUser } from "./Interface";
import MarketPlace from "./components/MarketPlace/Marketplace";

function App() {
  const [currentUser, setcurrentUser] = useState<ICurrentUser>({});

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
          <Route path="/" element={<MarketPlace />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                currentUser={currentUser}
                setcurrentUser={setcurrentUser}
              />
            }
          />
          <Route
            path="/project-design/:project_id"
            element={<DesignPage currentUser={currentUser} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
