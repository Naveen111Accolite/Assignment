import React, { createContext, useState } from "react";

const GoToPosContext = createContext();

function GoToPosProvider(props) {
  const [position, setPosition] = useState({ posX: 0, posY: 0 });

  return (
    <GoToPosContext.Provider value={[position, setPosition]}>
      {props.children}
    </GoToPosContext.Provider>
  );
}

export default GoToPosProvider;
