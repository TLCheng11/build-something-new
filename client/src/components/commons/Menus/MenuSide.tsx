import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";

interface Props {
  setshowProjectForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuSide(props: Props) {
  let navigate = useNavigate();
  const { setshowProjectForm } = props;
  const { currentUser, setcurrentUser } = useContext(UserContext);
  const [selectedTab, setselectedTab] = useState<string>("project");

  function logout() {
    fetch("/logout", {
      method: "POST",
    })
      .then((res) => res.json())
      .then(console.log);
    setcurrentUser({});
    navigate("/");
  }

  return (
    <div
      id="menu-side"
      className="h-full
     bg-slate-900 text-white p-3"
    >
      <div className="mb-3 text-5xl font-bold">
        <h1 className="text-3xl">Welcome:</h1>
        <h1 className="text-4xl">
          {currentUser.username?.slice(0, 1).toUpperCase()}
          {currentUser.username?.slice(1)}
        </h1>
      </div>
      <hr />
      {/* <button id="btn-logout" className="border" onClick={() => logout()}>
        Logout
      </button> */}
      <div className="text-3xl">
        <NavLink to="/dashboard/projects/1">
          <div
            className="side-menu-items"
            onClick={() => setselectedTab("project")}
          >
            My Projects
          </div>
        </NavLink>
        {selectedTab === "project" && (
          <div className="flex items-center ml-4">
            <p>└</p>
            <button
              id="btn-add-project"
              className="side-menu-items text-2xl border-b"
              onClick={() => setshowProjectForm(true)}
            >
              Add Project
            </button>
          </div>
        )}
        <div
          className="side-menu-items"
          onClick={() => setselectedTab("farovured")}
        >
          Favored
        </div>
        <div
          className="side-menu-items"
          onClick={() => setselectedTab("profile")}
        >
          Profile
        </div>
        <div className="side-menu-items" onClick={() => logout()}>
          Logout
        </div>
      </div>
    </div>
  );
}

export default MenuSide;
