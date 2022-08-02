import React, { createContext, useContext, useState } from "react";
import { Turn15ClockContext } from "./Turn15ClockProvider";
import { Move10StpesContext } from "./Move10Steps";

export const XandYValuesContext = createContext();

function XandYValuesProvider(props) {
  const [turn15, setTurn] = useContext(Turn15ClockContext);
  const [move10, setMove10] = useContext(Move10StpesContext);

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  // let x = 0;
  // let y = 0;
  // x += move10 * Math.cos(turn15 * (Math.PI / 180));
  // y += move10 * Math.sin(turn15 * (Math.PI / 180));

  // setX((prev) => prev + move10 * Math.cos(turn15 * (Math.PI / 180)));
  // setY((prev) => prev + move10 * Math.sin(turn15 * (Math.PI / 180)));

  return (
    <XandYValuesContext.Provider value={[x, setX, y, setY]}>
      {props.children}
    </XandYValuesContext.Provider>
  );
}

export default React.memo(XandYValuesProvider);
