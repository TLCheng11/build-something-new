import { useState } from "react";
import { Outlet } from "react-router-dom";
import MenuSide from "../commons/Menus/MenuSide";
import ProjectInfoForm from "../commons/Projects/ProjectInfoForm";

function Dashboard() {
  const [showProjectForm, setshowProjectForm] = useState<boolean>(false);

  return (
    <div
      id="dashboard"
      className="flex h-screen w-screen bg-gray-800 text-white"
    >
      {showProjectForm && (
        <ProjectInfoForm setshowProjectForm={setshowProjectForm} />
      )}
      <div id="menu-side" className="h-full w-1/5 border">
        <MenuSide setshowProjectForm={setshowProjectForm} />
      </div>
      <Outlet />
    </div>
  );
}

export default Dashboard;
