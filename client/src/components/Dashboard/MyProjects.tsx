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
  const [refresh, setRefresh] = useState<boolean>(false);
  const [myProjects, setMyProjects] = useState<IProject[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showProjectForm, setShowProjectForm] = useState<boolean>(false);
  const [currentProject, setCurrentProject] = useState<IProject>({
    id: 0,
    title: "",
    on_market: false,
    model_groups: [{ id: 0, group_name: "" }],
  });

  useEffect(() => {
    if (params.page) {
      setCurrentPage(parseInt(params.page));
    }
  }, []);

  useEffect(() => {
    if (currentUser.id) {
      fetch(
        `/users/${currentUser.id}/projects_page_count/?type=myProjects`
      ).then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setPageCount(data.page_count);
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
            res.json().then(setMyProjects);
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
    <div id="my-projects-container" className="h-full w-full">
      {showProjectForm && (
        <ProjectInfoForm
          setShowProjectForm={setShowProjectForm}
          action="edit"
          currentProject={currentProject}
          setRefresh={setRefresh}
          setCurrentPage={setCurrentPage}
        />
      )}
      {pageCount < 1 ? (
        <div className="flex items-center justify-center h-full w-full">
          <h1 className="text-4xl font-medium text-center">
            No project yet, please create a new project
          </h1>
        </div>
      ) : (
        <div id="my-projects-showcase" className="h-full w-full">
          <div className="pb-3 md:h-9/10 md:overflow-auto">
            <ProjectShowcase
              setRefresh={setRefresh}
              type="myProject"
              projects={myProjects}
              setShowProjectForm={setShowProjectForm}
              setCurrentProject={setCurrentProject}
            />
          </div>
          <div className="h-1/10">
            <PagesNavBar
              type="dashboard-projects"
              pageCount={pageCount}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProjects;
