import React, { useState } from "react";

function ToggleSprite({ spriteToggle, setSpriteToggle }) {
  // const [spriteToggle, setSpriteToggle] = useState(true);

  return (
    <button
      onClick={() => setSpriteToggle((prev) => !prev)}
      className="bg-red-400 border-solid border-2 border-indigo-600 rounded p-0.5 text-sm absolute top-1 left-1/2"
    >
      Toggle Sprite
    </button>
  );
}

export default ToggleSprite;
