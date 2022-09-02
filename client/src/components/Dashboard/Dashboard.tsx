import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICurrentUser } from "../../Interface";
import MenuSide from "../commons/Menus/MenuSide";
import ProjectInfoForm from "../commons/Projects/ProjectInfoForm";
import ProjectShowcase from "../commons/Projects/ProjectShowcase";

interface Props {
  currentUser: ICurrentUser;
  setcurrentUser: React.Dispatch<React.SetStateAction<ICurrentUser>>;
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
      <div id="menu-side" className="h-full w-1/5 border">
        <MenuSide
          currentUser={currentUser}
          setcurrentUser={setcurrentUser}
          setshowProjectForm={setshowProjectForm}
        />
      </div>
      <div id="my-projects-showcase" className="h-full w-4/5">
        <ProjectShowcase />
      </div>

      {showMyProjects}
    </div>
  );
}

export default Dashboard;
