import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import PagesNavBar from "../commons/Projects/PagesNavBar";
import ProjectShowcase from "../commons/Projects/ProjectShowcase";
import { IProject } from "../../Interface";

function FavoredProjects() {
  const params = useParams();
  const { currentUser } = useContext(UserContext);
  const [refresh, setrefresh] = useState<boolean>(false);
  const [favoredProjects, setfavoredProjects] = useState<IProject[]>([]);
  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setcurrentPage] = useState<number>(1);

  useEffect(() => {
    if (params.page) {
      setcurrentPage(parseInt(params.page));
    }
  }, []);

  useEffect(() => {
    if (currentUser.id) {
      fetch(`/users/${currentUser.id}/projects_page_count/?type=favored`).then(
        (res) => {
          if (res.ok) {
            res.json().then((data) => {
              setpageCount(data.page_count);
            });
          } else {
            res.json().then((data) => {
              alert(data.error);
            });
          }
        }
      );
    }
  }, [refresh]);

  useEffect(() => {
    if (currentUser.id && pageCount > 0) {
      fetch(`/projects_favored/?page=${currentPage}`).then((res) => {
        if (res.ok) {
          res.json().then(setfavoredProjects);
        } else {
          res.json().then((data) => {
            alert(data.error);
          });
        }
      });
    }
  }, [refresh, pageCount, currentPage]);

  return (
    <div className="h-full w-full">
      {pageCount < 1 ? (
        <div className="flex items-center justify-center h-full w-full">
          <h1>No project yet, please create a new project</h1>
        </div>
      ) : (
        <div id="my-projects-showcase" className="h-full w-full">
          <div className="h-9/10 pb-3 overflow-auto">
            <ProjectShowcase
              setrefresh={setrefresh}
              type="favored"
              projects={favoredProjects}
            />
          </div>
          <div className="h-1/10">
            <PagesNavBar
              type="favored-projects"
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

export default FavoredProjects;
