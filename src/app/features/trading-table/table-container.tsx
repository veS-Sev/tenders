import "./table-container.scss";
import { TableHead } from "./table-head/table-head";
import { TableBody } from "./table-body/table-body";
import { useAppSelector } from "../../hooks";
import { selectTradingById } from "../tradings/slices/tradings-data.slice";

export const TableContainer = () => {
  const activeTradingSelector = useAppSelector(
    (state) => state.activeTrading.activeTrading
  );
  const tradingById = useAppSelector((state) =>
    selectTradingById(state, activeTradingSelector)
  );
  return ( (
        <table className="table">
          <TableHead trading={tradingById} />
          <TableBody trading={tradingById} />
        </table>
      )

  );
};
