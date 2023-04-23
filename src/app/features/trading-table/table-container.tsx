import './table-container.scss'
import { TableHead } from "./table-head/table-head";
import { TableBody } from "./table-body/table-body";
export const TableContainer = () => {
  return (
    <table className="table">
      <TableHead/>
      <TableBody/>
    </table>
  );
};
