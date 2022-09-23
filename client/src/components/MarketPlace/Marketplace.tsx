import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { IProject } from "../../Interface";
import PagesNavBar from "../commons/Projects/PagesNavBar";
import ProjectShowcase from "../commons/Projects/ProjectShowcase";

function MarketPlace() {
  const params = useParams();
  const { currentUser, setfirstEnter } = useContext(UserContext);
  const [allProjects, setallProjects] = useState<IProject[]>([]);
  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setcurrentPage] = useState<number>(1);

  useEffect(() => {
    setfirstEnter(false);
    if (params.page) {
      setcurrentPage(parseInt(params.page));
    }
  }, []);

  useEffect(() => {
    if (currentUser.id) {
      fetch(`/projects_page_count`).then((res) => {
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
  }, []);

  useEffect(() => {
    if (currentUser.id && pageCount > 0) {
      fetch(`/projects/?page=${currentPage}`).then((res) => {
        if (res.ok) {
          res.json().then(setallProjects);
        } else {
          res.json().then((data) => {
            alert(data.error);
          });
        }
      });
    }
  }, [pageCount, currentPage]);

  return (
    <div id="dashboard" className="h-screen w-screen bg-white text-black">
      <div className="h-1/8 w-full flex justify-center">
        <h1 id="header-title">
          <span>B</span>
          <span>U</span>
          <span>I</span>
          <span>L</span>
          <span>D</span>
        </h1>
      </div>
      {pageCount < 1 ? (
        <div className="flex items-center justify-center h-7/8 w-full">
          <h1 className="text-4xl font-medium">No project on market</h1>
        </div>
      ) : (
        <div className="h-7/8 w-full">
          <div id="market-place-showcase" className="h-full w-full">
            <div className="h-7/8 w-full overflow-auto">
              <ProjectShowcase type="market" projects={allProjects} />
            </div>
            <div className="h-1/8">
              <PagesNavBar
                type="marketplace"
                pageCount={pageCount}
                currentPage={currentPage}
                setcurrentPage={setcurrentPage}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MarketPlace;
