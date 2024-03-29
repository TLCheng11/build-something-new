import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";

interface Props {
  showMenu: boolean;
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuTop({ showMenu, setShowMenu }: Props) {
  let navigate = useNavigate();
  const wh = (window.innerHeight / 3) * 2;
  const ww = window.innerWidth / 2;
  const { setCurrentUser } = useContext(UserContext);

  const [menuPosition, setMenuPosition] = useState<
    [number, number, number, number]
  >([0 - wh, 0 - ww, 0 - ww, 180]);

  const base = window.innerWidth <= 912 ? 1 : 2;

  const angle =
    (((window.innerHeight * 3) / 5 / (window.innerWidth / base)) * 180) /
    Math.PI;

  // const angle =
  //   Math.atan((window.innerHeight * 3) / 5 / (window.innerWidth / 2)) * 180;

  useEffect(() => {
    if (showMenu) {
      setMenuPosition([0, 0, 0, 0]);
    } else {
      setMenuPosition([0 - wh, 0 - ww, 0 - ww, 180]);
    }
  }, [showMenu]);

  function logout() {
    fetch("/logout", {
      method: "POST",
    })
      .then((res) => res.json())
      .then(console.log);
    setCurrentUser({});
    navigate("/");
  }

  return (
    <div>
      <div
        className="cursor-pointer fixed flex items-end justify-start h-24 w-24 z-50 -top-12 -right-12 p-3 bg-blue-600 rounded-full hover:scale-200 transition-all duration-300 ease-in"
        onClick={() => setShowMenu((state) => !state)}
      >
        <p className="absolute left-1 rotate-45">Menu</p>
      </div>
      <div className="text-3xl md:text-6xl">
        <div
          id="menu-top"
          className="flex items-center justify-center h-3/5 w-screen z-40 fixed text-red-400 bg-blue-500 transition-all duration-1000 ease-in"
          style={{
            clipPath: "polygon(0 0, 50% 100%, 100% 0)",
            // top: menuPosition[0],
            transformOrigin: "top",
            transform: `rotateX(${menuPosition[3]}deg)`,
            // transform: `rotate(${menuPosition[3]}deg)`,
          }}
        >
          <NavLink to="/dashboard/projects/1">
            <div onClick={() => setShowMenu(false)}>DashBoard</div>
          </NavLink>
          {/* <nav className="flex items-center">
          
          
          
        </nav> */}
        </div>
        <div
          className="h-full w-1/2 z-40 fixed flex items-center justify-center text-green-400 bg-red-400 transition-all duration-1000 ease-in"
          style={{
            clipPath: "polygon(0 0, 100% 59.9%, 100% 100%, 0% 100%)",
            // left: menuPosition[1],
            transformOrigin: "left",
            transform: `rotateY(${menuPosition[3]}deg)`,
            // transform: `rotate(${menuPosition[3]}deg)`,
          }}
        >
          <NavLink to="/marketplace/1">
            <div
              // className="rotate-36"
              style={{ transform: `rotate(${angle}deg)` }}
              onClick={() => setShowMenu(false)}
            >
              Marketplace
            </div>
          </NavLink>
        </div>
        <div
          className="h-full w-1/2 z-40 fixed flex items-center justify-center right-0 text-blue-500 bg-green-400 transition-all duration-1000 ease-in"
          style={{
            clipPath: "polygon(0 59.9%, 100% 0, 100% 100%, 0% 100%)",
            // right: menuPosition[2],
            transformOrigin: "right",
            transform: `rotateY(${menuPosition[3]}deg)`,
            // transform: `rotate(${menuPosition[3]}deg)`,
          }}
        >
          <NavLink to="/dashboard/profile">
            <div
              // className="-rotate-36"
              style={{ transform: `rotate(-${angle}deg)` }}
              onClick={() => setShowMenu(false)}
            >
              Profile
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default MenuTop;
