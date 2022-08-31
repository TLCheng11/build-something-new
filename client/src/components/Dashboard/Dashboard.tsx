import { useEffect, useState } from "react";
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
  setcurrentUser: React.Dispatch<
    React.SetStateAction<{
      id?: number | undefined;
      email?: string | undefined;
      username?: string | undefined;
      first_name?: string | undefined;
      last_name?: string | undefined;
      dob?: Date | undefined;
      profile_img?: string | undefined;
      introduction?: string | undefined;
      is_login?: boolean | undefined;
    }>
  >;
}

function Dashboard(props: Props) {
  let navigate = useNavigate();
  const { currentUser, setcurrentUser } = props;
  const [showProjectForm, setshowProjectForm] = useState<boolean>(false);
  const [myProjects, setmyProjects] = useState<
    [{ id?: number; title?: string }]
  >([{}]);

  const showMyProjects = myProjects.map((project) => (
    <div
      className="cursor-pointer"
      key={project.id}
      onClick={() => toProjectDesign(project.id)}
    >
      {project.title}
    </div>
  ));

  useEffect(() => {
    fetch(`/users/${currentUser.id}/projects`)
      .then((res) => res.json())
      .then(setmyProjects);
  }, []);

  function logout() {
    fetch("/logout", {
      method: "POST",
    })
      .then((res) => res.json())
      .then(console.log);
    setcurrentUser({});
    navigate("/");
  }

  function toProjectDesign(id?: number) {
    navigate(`/project-design/${id}`);
  }

  return (
    <div id="dashboard" className="h-screen w-full bg-gray-800 text-white">
      {showProjectForm && (
        <ProjectInfoForm
          currentUser={currentUser}
          setshowProjectForm={setshowProjectForm}
        />
      )}
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
      {showMyProjects}
    </div>
  );
}

export default Dashboard;
