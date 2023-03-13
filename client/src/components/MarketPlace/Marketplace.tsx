import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { IProject } from "../../Interface";
import PagesNavBar from "../commons/Projects/PagesNavBar";
import ProjectShowcase from "../commons/Projects/ProjectShowcase";

function MarketPlace() {
  const params = useParams();
  const { setFirstEnter } = useContext(UserContext);
  const [allProjects, setAllProjects] = useState<IProject[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setFirstEnter(false);
    if (params.page) {
      setCurrentPage(parseInt(params.page));
    }
  }, []);

  useEffect(() => {
    // if (currentUser.id) {
    fetch(`/projects_page_count`).then((res) => {
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
    // }
  }, []);

  useEffect(() => {
    if (pageCount > 0) {
      fetch(`/projects/?page=${currentPage}`).then((res) => {
        if (res.ok) {
          res.json().then(setAllProjects);
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
      <div className="h-1/10 min-h-80 w-full flex justify-center md:h-1/8">
        <h1
          id="header-title"
          className="scale-title md:scale-75 lg:scale-100 flex items-center"
        >
          <span>F</span>
          <span>R</span>
          <span>E</span>
          <span>E</span>
          <span>D</span>
          <span>I</span>
          <span>M</span>
          <span>E</span>
          <span>N</span>
          <span>S</span>
          <span>I</span>
          <span>O</span>
          <span>N</span>
        </h1>
      </div>
      {pageCount < 1 ? (
        <div className="flex items-center justify-center h-7/8 w-full">
          <h1 className="text-4xl font-medium">No project on market</h1>
        </div>
      ) : (
        <div className="h-7/8 w-full">
          <div id="market-place-showcase" className="h-full w-full">
            <div className="w-full overflow-auto lg:h-7/8">
              <ProjectShowcase type="market" projects={allProjects} />
            </div>
            <div className="h-1/8">
              <PagesNavBar
                type="marketplace"
                pageCount={pageCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MarketPlace;
