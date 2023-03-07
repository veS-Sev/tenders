import { useDispatch } from "react-redux";
import { changeParticipant } from "../../store/slices/table.slice";
import {currentActiveParticipant} from '../../functions/current-active-participant.funс'


import './table-container.scss'
import { TableHead } from "./table-head/table-head";
import { TableBody } from "./table-body/table-body";
export const TableContainer = () => {
  // const [activeParticipant, setActiveParticipant] = useState(
  //   currentActiveParticipant()
  // );
  const dispatch= useDispatch()
// const changeParticipant=()=>{
//   setActiveParticipant(currentActiveParticipant())
// }

  return (
    <table className="table">
      <TableHead/>
      <TableBody/>
    </table>
  );
};
