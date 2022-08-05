import React, { useState, useContext } from "react";
import { XandYValuesContext } from "../context/XandYValuesProvider";

function ToggleSprite({ spriteToggle, setSpriteToggle }) {
  // const [spriteToggle, setSpriteToggle] = useState(true);
  const [x, setX, y, setY] = useContext(XandYValuesContext);

  return (
    <button
      onClick={() => {
        setSpriteToggle((prev) => !prev);
        setX(x);
        setY(y);
      }}
      className="bg-red-400 border-solid border-2 border-indigo-600 rounded p-0.5 text-sm absolute top-1 left-1/2"
    >
      Toggle Sprite
    </button>
  );
}

export default ToggleSprite;
