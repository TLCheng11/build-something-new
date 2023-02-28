import { useState } from "react";
import { Outlet } from "react-router-dom";
import MenuSide from "./MenuSide";
import ProjectInfoForm from "../commons/Projects/ProjectInfoForm";

function Dashboard() {
  const [showProjectForm, setShowProjectForm] = useState<boolean>(false);

  return (
    <div
      id="dashboard"
      className="h-screen w-screen bg-white text-black md:flex"
    >
      {showProjectForm && (
        <ProjectInfoForm
          setShowProjectForm={setShowProjectForm}
          action="post"
        />
      )}
      <div
        id="menu-side"
        className="h-1/6 w-full min-w-225 border-r md:h-full md:w-1/5"
      >
        <MenuSide setShowProjectForm={setShowProjectForm} />
      </div>
      <Outlet />
    </div>
  );
}

export default Dashboard;
