import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";

function MenuTop() {
  let navigate = useNavigate();
  const { setcurrentUser } = useContext(UserContext);

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
      id="menu-top"
      className="fixed flex justify-center -top-9 h-10 w-screen z-30 bg-blue-500 text-white transition-all duration-300 ease-in hover:top-0"
    >
      <nav className="flex items-center">
        <NavLink to="/dashboard/projects/1">
          <div className="mx-2">DashBoard</div>
        </NavLink>
        <NavLink to="/">
          <div className="mx-2">Marketplace</div>
        </NavLink>
        <div className="mx-2">Profile</div>
        <div className="cursor-pointer mx-2" onClick={logout}>
          Logout
        </div>
      </nav>
    </div>
  );
}

export default MenuTop;
