import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ICurrentUser, IProject } from "../../Interface";
import PagesNavBar from "../commons/Projects/PagesNavBar";
import ProjectShowcase from "../commons/Projects/ProjectShowcase";

interface Props {
  currentUser: ICurrentUser;
}

function MarketPlace(props: Props) {
  let navigate = useNavigate();
  const { currentUser } = props;
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

  // to protect this page route
  useEffect(() => {
    if (!currentUser.id) {
      navigate("/");
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
    if (currentUser.id) {
      fetch(`/projects/?page=${currentPage}`).then((res) => {
        if (res.ok) {
          res.json().then(setmyProjects);
        } else {
          res.json().then((data) => {
            alert(data.error);
          });
        }
      });
    }
  }, [currentPage]);

  return (
    <div
      id="dashboard"
      className="flex h-screen w-screen bg-gray-800 text-white"
    >
      <div id="market-place-showcase" className="h-full w-full">
        <div className="h-9/10 w-full overflow-hidden">
          <ProjectShowcase type="market" myProjects={myProjects} />
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

export default MarketPlace;
