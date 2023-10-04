import React from "react";
import { Pagination } from "antd";

const PagePagination = ({
  pages,
  setPages,
  totalPages,
  pagesSearch,
  setPagesSearch,
  totalPagesSearch,
}) => {
  return (
    <Pagination
      style={{ textAlign: "center", marginTop: "20px" }}
      current={pages}
      total={totalPages}
      onChange={(page) => setPages(page)}
      defaultCurrent={1}
    />
  );
};
export default PagePagination;
