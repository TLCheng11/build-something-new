import { useEffect, useState } from "react";
import { ICurrentUser, IProject } from "../../Interface";
import MenuSide from "../commons/Menus/MenuSide";
import PagesNavBar from "../commons/Projects/PagesNavBar";
import ProjectInfoForm from "../commons/Projects/ProjectInfoForm";
import ProjectShowcase from "../commons/Projects/ProjectShowcase";

interface Props {
  currentUser: ICurrentUser;
  setcurrentUser: React.Dispatch<React.SetStateAction<ICurrentUser>>;
}

function Dashboard(props: Props) {
  const { currentUser, setcurrentUser } = props;
  const [showProjectForm, setshowProjectForm] = useState<boolean>(false);

  const [myProjects, setmyProjects] = useState<[IProject]>([
    {
      id: 0,
      title: "",
      on_market: false,
      model_groups: [{ id: 0, group_name: "" }],
    },
  ]);
  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setcurrentPage] = useState<number>(1);

  console.log(myProjects);

  useEffect(() => {
    fetch(`/users/${currentUser.id}/projects_page_count`).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setpageCount(data.page_count);
        });
      } else {
        res.json().then((data) => {
          alert(data.error);
        });
      }
    });
  }, []);

  useEffect(() => {
    fetch(`/users/${currentUser.id}/projects/?page=${currentPage}`).then(
      (res) => {
        if (res.ok) {
          res.json().then(setmyProjects);
        } else {
          res.json().then((data) => {
            alert(data.message);
          });
        }
      }
    );
  }, [currentPage]);

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
      <div id="my-projects-showcase" className="h-full w-4/5">
        <div className="h-9/10 w-full overflow-hidden">
          <ProjectShowcase type="myProject" myProjects={myProjects} />
        </div>
        <div className="h-1/10">
          <PagesNavBar
            pageCount={pageCount}
            currentPage={currentPage}
            setcurrentPage={setcurrentPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
