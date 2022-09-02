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
    [{ id: number; title?: string }]
  >([{ id: 0 }]);

  useEffect(() => {
    fetch(`/users/${currentUser.id}/projects`)
      .then((res) => res.json())
      .then(setmyProjects);
  }, []);

  return (
    <div id="dashboard" className="flex h-screen w-full bg-gray-800 text-white">
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
        <ProjectShowcase
          myProjects={myProjects}
          setmyProjects={setmyProjects}
        />
      </div>
    </div>
  );
}

export default Dashboard;
