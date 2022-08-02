import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import ToggleSprite from "./components/ToggleSprite";

export default function App() {
  const [spriteToggle, setSpriteToggle] = useState(true);

  function dragDrop2(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    document.querySelector(`#midarea #${data}`).remove();
  }

  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row  ">
        <ToggleSprite
          spriteToggle={spriteToggle}
          setSpriteToggle={setSpriteToggle}
        />
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <Sidebar dragDrop={(event) => dragDrop2(event)} />{" "}
          <MidArea
            dragDrop2={dragDrop2}
            // turn15={turn15}
            spriteToggle={spriteToggle}
          />
        </div>

        <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <PreviewArea
            spriteToggle={spriteToggle}
            setSpriteToggle={setSpriteToggle}
          />
        </div>
      </div>
    </div>
  );
}
