import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import PagesNavBar from "../commons/Projects/PagesNavBar";
import ProjectShowcase from "../commons/Projects/ProjectShowcase";
import { IProject } from "../../Interface";

function FavoredProjects() {
  const params = useParams();
  const { currentUser } = useContext(UserContext);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [favoredProjects, setFavoredProjects] = useState<IProject[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (params.page) {
      setCurrentPage(parseInt(params.page));
    }
  }, []);

  useEffect(() => {
    if (currentUser.id) {
      fetch(`/users/${currentUser.id}/projects_page_count/?type=favored`).then(
        (res) => {
          if (res.ok) {
            res.json().then((data) => {
              setPageCount(data.page_count);
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
          res.json().then(setFavoredProjects);
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
          <h1 className="text-4xl font-medium">No favored project</h1>
        </div>
      ) : (
        <div id="my-projects-showcase" className="h-full w-full">
          <div className="md:h-9/10 pb-3 md:overflow-auto">
            <ProjectShowcase
              setRefresh={setRefresh}
              type="favored"
              projects={favoredProjects}
            />
          </div>
          <div className="h-1/10">
            <PagesNavBar
              type="favored-projects"
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

export default FavoredProjects;
