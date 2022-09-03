import { useState } from "react";

function PagesBar() {
  const [currentPage, setcurrentPage] = useState<number>(16);
  const arr = 20;
  const totalPages = Array.from(Array(arr).keys());

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
      <div key={page} className="mx-2">
        {page + 1}
      </div>
    ));

  return (
    <div>
      <div className="flex justify-center pt-8">{pages}</div>
    </div>
  );
}

export default PagesBar;
