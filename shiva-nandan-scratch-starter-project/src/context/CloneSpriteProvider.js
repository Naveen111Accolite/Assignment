import React, { useState, createContext, useEffect } from "react";
import CatSprite from "../components/CatSprite";

export const CloneSpriteContext = createContext();
function CloneSpriteProvider(props) {
  const [clonesprite, setClonesprite] = useState([]);

  return (
    <CloneSpriteContext.Provider value={[clonesprite, setClonesprite]}>
      {props.children}
    </CloneSpriteContext.Provider>
  );
}

export default CloneSpriteProvider;
