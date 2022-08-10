import React, { useState, createContext, useEffect } from "react";

export const SelectedSVGContext = createContext();
function SelectedSVGProvider(props) {
  const [selectedSVG, setSelectedSVG] = useState("CatSprite");

  return (
    <SelectedSVGContext.Provider value={[selectedSVG, setSelectedSVG]}>
      {props.children}
    </SelectedSVGContext.Provider>
  );
}

export default SelectedSVGProvider;
