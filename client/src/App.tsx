import { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import LoginScreen from "./components/LoginScreen/LoginScreen";
import DesignPage from "./components/DesignPage/DesignPageLayout/DesignPage";
import Dashboard from "./components/Dashboard/Dashboard";
import MarketPlace from "./components/MarketPlace/Marketplace";
import MenuTop from "./components/commons/Menus/MenuTop";
import DetailView from "./components/DetailView/DetailView";
import MyProjects from "./components/Dashboard/MyProjects";

function App() {
  const { currentUser, setcurrentUser } = useContext(UserContext);

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
      <MenuTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/marketplace/:page" element={<MarketPlace />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="projects/:page" element={<MyProjects />} />
            <Route
              path="*"
              element={<div className="text-6xl">Page Not Found</div>}
            />
          </Route>
          <Route path="/project-design/:project_id" element={<DesignPage />} />
          <Route
            path="/project-detail-view/:project_id"
            element={<DetailView />}
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
