import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectInfoForm from "../commons/Projects/ProjectInfoForm";

interface Props {
  currentUser: {
    id?: number | undefined;
    email?: string | undefined;
    username?: string | undefined;
    first_name?: string | undefined;
    last_name?: string | undefined;
    dob?: Date | undefined;
    profile_img?: string | undefined;
    introduction?: string | undefined;
    is_login?: boolean | undefined;
  };
}

function Dashboard(props: Props) {
  let navigate = useNavigate();
  const { currentUser } = props;
  const [showProjectForm, setshowProjectForm] = useState<boolean>(false);

  return (
    <div id="dashboard" className="h-screen w-full bg-gray-800 text-white">
      {showProjectForm && (
        <ProjectInfoForm
          currentUser={currentUser}
          setshowProjectForm={setshowProjectForm}
        />
      )}
      <h1>Hi {currentUser.username}</h1>
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

export default Dashboard;
