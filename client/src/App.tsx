import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import DesignPage from "./components/DesignPage/DesignPageLayout/DesignPage";
import Dashboard from "./components/Dashboard/Dashboard";
import MarketPlace from "./components/MarketPlace/Marketplace";
import MenuTop from "./components/commons/Menus/MenuTop";
import DetailView from "./components/DetailView/DetailView";
import MyProjects from "./components/Dashboard/MyProjects";
import FavoredProjects from "./components/Dashboard/FavoredProjects";
import Profile from "./components/Dashboard/Profile";
import TestPhysic from "./components/commons/TestPhysic/TestPhysic";

function App() {
  const { currentUser, setcurrentUser } = useContext(UserContext);
  const [showMenu, setshowMenu] = useState<boolean>(false);

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route
            path="*"
            element={<div className="text-6xl">Page Not Found</div>}
          />
        </Routes>
      </BrowserRouter>
    );

  return (
    <BrowserRouter>
      <MenuTop showMenu={showMenu} setshowMenu={setshowMenu} />
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/marketplace/:page" element={<MarketPlace />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="projects/:page" element={<MyProjects />} />
            <Route path="favors/:page" element={<FavoredProjects />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="*"
              element={<div className="text-6xl">Page Not Found</div>}
            />
          </Route>
          <Route
            path="/project-design/:project_id"
            element={<DesignPage showMenu={showMenu} />}
          />
          <Route
            path="/project-detail-view/:project_id"
            element={<DetailView />}
          />
          <Route
            path="/project-test-physic/:project_id"
            element={<TestPhysic />}
          />
          <Route
            path="*"
            element={<div className="text-6xl">Page Not Found</div>}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
