import { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

interface Props {
  setShowProjectForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuSide(props: Props) {
  let navigate = useNavigate();
  const location = useLocation();
  const { setFirstEnter } = useContext(UserContext);
  const { setShowProjectForm } = props;
  const { currentUser, setCurrentUser } = useContext(UserContext);

  function logout() {
    fetch("/logout", {
      method: "POST",
    })
      .then((res) => res.json())
      .then(console.log);
    setCurrentUser({});
    setFirstEnter(true);
    navigate("/");
  }

  return (
    <div id="menu-side" className="bg-slate-900 text-white p-3 md:h-full">
      <div className="mb-3 text-5xl font-bold">
        <h1 className="text-3xl">Welcome:</h1>
        <h1 className="text-4xl">
          {currentUser.username?.slice(0, 1).toUpperCase()}
          {currentUser.username?.slice(1)}
        </h1>
      </div>
      <hr />
      <div className="flex text-md md:block md:text-3xl">
        <div>
          <NavLink to="/dashboard/projects/1">
            <div
              className={`side-menu-items ${
                location.pathname.includes("project") && "underline"
              }`}
            >
              Projects
            </div>
          </NavLink>
          {location.pathname.includes("project") && (
            <div className="hidden items-center ml-4 md:flex">
              <p>└</p>
              <button
                id="btn-add-project"
                className="text-md side-menu-items md:text-2xl"
                onClick={() => setShowProjectForm(true)}
              >
                Add Project
              </button>
            </div>
          )}
        </div>
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
      {location.pathname.includes("project") && (
        <div className="flex items-center ml-4 md:hidden">
          <p>└</p>
          <button
            id="btn-add-project"
            className="text-md side-menu-items md:text-2xl"
            onClick={() => setShowProjectForm(true)}
          >
            Add Project
          </button>
        </div>
      )}
    </div>
  );
}

export default MenuSide;
