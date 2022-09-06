import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";

interface Props {
  setshowProjectForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuSide(props: Props) {
  let navigate = useNavigate();
  const { setshowProjectForm } = props;
  const { currentUser, setcurrentUser } = useContext(UserContext);

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
    <div id="menu-side">
      <h1>Hi {currentUser.username}</h1>
      <button id="btn-logout" className="border" onClick={() => logout()}>
        Logout
      </button>
      <button
        id="btn-add-project"
        className="border"
        onClick={() => setshowProjectForm(true)}
      >
        Add Project
      </button>
    </div>
  );
}

export default MenuSide;
