import { useEffect, useState } from "react";
import { Outlet, Route } from "react-router-dom";
import { ICurrentUser, IProject } from "../../Interface";
import MenuSide from "../commons/Menus/MenuSide";
import PagesNavBar from "../commons/Projects/PagesNavBar";
import ProjectInfoForm from "../commons/Projects/ProjectInfoForm";
import ProjectShowcase from "../commons/Projects/ProjectShowcase";
import MyProjects from "./MyProjects";

interface Props {
  currentUser: ICurrentUser;
  setcurrentUser: React.Dispatch<React.SetStateAction<ICurrentUser>>;
}

function Dashboard(props: Props) {
  const { currentUser, setcurrentUser } = props;
  const [showProjectForm, setshowProjectForm] = useState<boolean>(false);

  return (
    <div
      id="dashboard"
      className="flex h-screen w-screen bg-gray-800 text-white"
    >
      {showProjectForm && (
        <ProjectInfoForm
          currentUser={currentUser}
          setshowProjectForm={setshowProjectForm}
        />
      )}
      <div id="menu-side" className="h-full w-1/5 border">
        <MenuSide
          currentUser={currentUser}
          setcurrentUser={setcurrentUser}
          setshowProjectForm={setshowProjectForm}
        />
      </div>
      <Outlet />
    </div>
  );
}

export default Dashboard;
