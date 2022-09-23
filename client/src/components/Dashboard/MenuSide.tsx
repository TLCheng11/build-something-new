import { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

interface Props {
  setshowProjectForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuSide(props: Props) {
  let navigate = useNavigate();
  const location = useLocation();
  const { setfirstEnter } = useContext(UserContext);
  const { setshowProjectForm } = props;
  const { currentUser, setcurrentUser } = useContext(UserContext);

  function logout() {
    fetch("/logout", {
      method: "POST",
    })
      .then((res) => res.json())
      .then(console.log);
    setcurrentUser({});
    setfirstEnter(true);
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
      <div className="text-3xl">
        <NavLink to="/dashboard/projects/1">
          <div
            className={`side-menu-items ${
              location.pathname.includes("project") && "underline"
            }`}
          >
            My Projects
          </div>
        </NavLink>
        {location.pathname.includes("project") && (
          <div className="flex items-center ml-4">
            <p>└</p>
            <button
              id="btn-add-project"
              className="side-menu-items text-2xl"
              onClick={() => setshowProjectForm(true)}
            >
              Add Project
            </button>
          </div>
        )}
        <NavLink to="/dashboard/favors/1">
          <div
            className={`side-menu-items ${
              location.pathname.includes("favors") && "underline"
            }`}
          >
            Favored
          </div>
        </NavLink>
        <NavLink to="/dashboard/profile">
          <div
            className={`side-menu-items ${
              location.pathname.includes("profile") && "underline"
            }`}
          >
            Profile
          </div>
        </NavLink>
        <div className="side-menu-items" onClick={() => logout()}>
          Logout
        </div>
      </div>
    </div>
  );
}

export default MenuSide;
