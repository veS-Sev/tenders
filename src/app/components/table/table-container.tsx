import React from "react";

import { TableHead } from "./table-head/table-head";
import { TableBody } from "./table-body/table-body";
export const TableContainer = () => {
  return (
    <table>
      <TableHead />
      <TableBody />
    </table>
  );
};
