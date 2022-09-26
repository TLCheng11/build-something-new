import { Dispatch, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  type: string;
  pageCount: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

function PagesNavBar(props: Props) {
  let navigate = useNavigate();
  const { type, pageCount, currentPage, setCurrentPage } = props;
  const totalPages = Array.from(Array(pageCount).keys());

  const pages = totalPages
    .filter((page) => {
      if (currentPage > totalPages.length - 4) {
        return page > totalPages.length - 10;
      } else if (currentPage > 5) {
        return page > currentPage - 6 && page < currentPage + 4;
      } else {
        return page < 9;
      }
    })
    .map((page) => (
      <div
        key={page}
        className={`mx-1 px-1 cursor-pointer ${
          currentPage === page + 1 ? "border" : ""
        } hover:bg-slate-500`}
        onClick={() => setCurrentPage(page + 1)}
      >
        {page + 1}
      </div>
    ));

  useEffect(() => {
    if (type === "marketplace") {
      navigate(`/marketplace/${currentPage}`);
    } else if (type === "dashboard-projects") {
      navigate(`/dashboard/projects/${currentPage}`);
    } else if (type === "favored-projects") {
      navigate(`/dashboard/favors/${currentPage}`);
    }
  }, [currentPage]);

  return (
    <div>
      <div className="flex justify-center pt-8">
        <button
          className="mx-1 px-1 border hover:bg-slate-500"
          onClick={() => setCurrentPage(1)}
        >
          {"First"}
        </button>
        <button
          className="mx-1 px-1 border hover:bg-slate-500"
          onClick={() => {
            if (currentPage > 1) setCurrentPage((page) => page - 1);
          }}
        >
          {"<"}
        </button>
        {pages}
        <button
          className="mx-1 px-1 border hover:bg-slate-500"
          onClick={() => {
            if (currentPage < pageCount) setCurrentPage((page) => page + 1);
          }}
        >
          {">"}
        </button>
        <button
          className="mx-1 px-1 border hover:bg-slate-500"
          onClick={() => setCurrentPage(pageCount)}
        >
          {"Last"}
        </button>
      </div>
    </div>
  );
}

export default PagesNavBar;
