import React from "react";
import { TTradingParameters } from "../../../constants/types";
import { tradingParameters } from "../../../constants/trading-parameters.const";
import { participantsData } from "../../../constants/participants.const";


export const TableBody = () => {
  return (
    <tbody>
      {Object.getOwnPropertyNames(tradingParameters).map((parametr: string) => (
        <tr>
          <th key={parametr}>{tradingParameters[parametr as keyof TTradingParameters]}</th>
          {participantsData.map((participant) => (
            <td>{participant[parametr as keyof TTradingParameters]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );

};
