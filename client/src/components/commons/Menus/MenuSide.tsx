import { useNavigate } from "react-router-dom";
import { ICurrentUser } from "../../../Interface";

interface Props {
  currentUser: ICurrentUser;
  setcurrentUser: React.Dispatch<React.SetStateAction<ICurrentUser>>;
  setshowProjectForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuSide(props: Props) {
  let navigate = useNavigate();
  const { currentUser, setcurrentUser, setshowProjectForm } = props;

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
    <div>
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
