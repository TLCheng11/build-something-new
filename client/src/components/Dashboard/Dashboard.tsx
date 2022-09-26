import { useState } from "react";
import { Outlet } from "react-router-dom";
import MenuSide from "./MenuSide";
import ProjectInfoForm from "../commons/Projects/ProjectInfoForm";

function Dashboard() {
  const [showProjectForm, setShowProjectForm] = useState<boolean>(false);

  return (
    <div id="dashboard" className="flex h-screen w-screen bg-white text-black">
      {showProjectForm && (
        <ProjectInfoForm
          setShowProjectForm={setShowProjectForm}
          action="post"
        />
      )}
      <div id="menu-side" className="h-full w-1/5 min-w-225 border-r">
        <MenuSide setShowProjectForm={setShowProjectForm} />
      </div>
      <Outlet />
    </div>
  );
}

export default Dashboard;
