import React, { useState, createContext, useEffect } from "react";

export const Turn15ClockContext = createContext();
function Turn15ClockProvider(props) {
  const [turn15, setTurn] = useState(0);

  return (
    <Turn15ClockContext.Provider value={[turn15, setTurn]}>
      {props.children}
    </Turn15ClockContext.Provider>
  );
}

export default React.memo(Turn15ClockProvider);
