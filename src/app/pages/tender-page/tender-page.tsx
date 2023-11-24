import "./tender-page.scss";
import { TableContainer } from "../../features/tenders-table/table-container";
import { useParams } from "react-router-dom";
export const TenderPage = () => {
  const { id } = useParams();
  return (
      <TableContainer/>
  );
};
