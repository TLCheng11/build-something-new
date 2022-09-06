import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import PagesNavBar from "../commons/Projects/PagesNavBar";
import ProjectShowcase from "../commons/Projects/ProjectShowcase";
import { IProject } from "../../Interface";
import ProjectInfoForm from "../commons/Projects/ProjectInfoForm";

function MyProjects() {
  const params = useParams();
  const { currentUser } = useContext(UserContext);
  const [refresh, setrefresh] = useState<boolean>(false);
  const [myProjects, setmyProjects] = useState<IProject[]>([]);
  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [showProjectForm, setshowProjectForm] = useState<boolean>(false);
  const [currentProject, setcurrentProject] = useState<IProject>({
    id: 0,
    title: "",
    on_market: false,
    model_groups: [{ id: 0, group_name: "" }],
  });

  useEffect(() => {
    if (params.page) {
      setcurrentPage(parseInt(params.page));
    }
  }, []);

  useEffect(() => {
    if (currentUser.id) {
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
    }
  }, [refresh]);

  useEffect(() => {
    if (currentUser.id && pageCount > 0) {
      fetch(`/users/${currentUser.id}/projects/?page=${currentPage}`).then(
        (res) => {
          if (res.ok) {
            res.json().then(setmyProjects);
          } else {
            res.json().then((data) => {
              alert(data.error);
            });
          }
        }
      );
    }
  }, [refresh, pageCount, currentPage]);

  return (
    <div className="h-full w-full">
      {showProjectForm && (
        <ProjectInfoForm
          setshowProjectForm={setshowProjectForm}
          action="edit"
          currentProject={currentProject}
          setrefresh={setrefresh}
          setcurrentPage={setcurrentPage}
        />
      )}
      {pageCount < 1 ? (
        <div className="flex items-center justify-center h-full w-full">
          <h1>No project yet, please create a new project</h1>
        </div>
      ) : (
        <div id="my-projects-showcase" className="h-full w-full">
          <div className="h-9/10 overflow-auto">
            <ProjectShowcase
              setrefresh={setrefresh}
              type="myProject"
              myProjects={myProjects}
              setshowProjectForm={setshowProjectForm}
              setcurrentProject={setcurrentProject}
            />
          </div>
          <div className="h-1/10">
            <PagesNavBar
              type="dashboard-projects"
              pageCount={pageCount}
              currentPage={currentPage}
              setcurrentPage={setcurrentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProjects;
