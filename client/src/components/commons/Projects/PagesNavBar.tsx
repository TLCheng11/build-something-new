import { Dispatch, SetStateAction } from "react";

interface Props {
  pageCount: number;
  currentPage: number;
  setcurrentPage: Dispatch<SetStateAction<number>>;
}

function PagesNavBar(props: Props) {
  const { pageCount, currentPage, setcurrentPage } = props;
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
        onClick={() => setcurrentPage(page + 1)}
      >
        {page + 1}
      </div>
    ));

  return (
    <div>
      <div className="flex justify-center pt-8">
        <button
          className="mx-1 px-1 border hover:bg-slate-500"
          onClick={() => setcurrentPage(1)}
        >
          {"<<"}
        </button>
        <button
          className="mx-1 px-1 border hover:bg-slate-500"
          onClick={() => {
            if (currentPage > 1) setcurrentPage((page) => page - 1);
          }}
        >
          {"<"}
        </button>
        {pages}
        <button
          className="mx-1 px-1 border hover:bg-slate-500"
          onClick={() => {
            if (currentPage < pageCount) setcurrentPage((page) => page + 1);
          }}
        >
          {">"}
        </button>
        <button
          className="mx-1 px-1 border hover:bg-slate-500"
          onClick={() => setcurrentPage(pageCount)}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
}

export default PagesNavBar;