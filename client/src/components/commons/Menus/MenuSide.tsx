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
  const [atMyProjects, setatMyProjects] = useState<boolean>(true);

  // function logout() {
  //   fetch("/logout", {
  //     method: "POST",
  //   })
  //     .then((res) => res.json())
  //     .then(console.log);
  //   setcurrentUser({});
  //   navigate("/");
  // }

  return (
    <div id="menu-side">
      <h1 className="text-2xl">Welcome Back:</h1>
      <h1 className="text-2xl">{currentUser.username}</h1>
      {/* <button id="btn-logout" className="border" onClick={() => logout()}>
        Logout
      </button> */}
      <div>
        <NavLink to="/dashboard/projects/1">
          <div onClick={() => setatMyProjects(true)}>My Projects</div>
        </NavLink>
        {atMyProjects && (
          <button
            id="btn-add-project"
            className="border"
            onClick={() => setshowProjectForm(true)}
          >
            Add Project
          </button>
        )}
        <div onClick={() => setatMyProjects(false)}>Farvourites</div>
        <div onClick={() => setatMyProjects(false)}>Purchased</div>
      </div>
    </div>
  );
}

export default MenuSide;
