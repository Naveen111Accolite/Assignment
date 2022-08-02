import React, { useState, createContext, useEffect } from "react";

export const Move10StpesContext = createContext();
function Move10StpesProvider(props) {
  const [move10, setMove10] = useState(0);

  return (
    <Move10StpesContext.Provider value={[move10, setMove10]}>
      {props.children}
    </Move10StpesContext.Provider>
  );
}

export default Move10StpesProvider;
