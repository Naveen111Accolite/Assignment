import React, { useEffect, useContext, useState } from "react";
import CatSprite from "./CatSprite";
import BananaSprite from "./BananaSprite";
import { Turn15ClockContext } from "../context/Turn15ClockProvider";
import { Move10StpesContext } from "../context/Move10Steps";
import { XandYValuesContext } from "../context/XandYValuesProvider";
import tooltipFunc from "../utils/Tooltip";

import "../styles.css";

export default function PreviewArea({
  spriteToggle,
  setSpriteToggle,
  dragStart,
}) {
  const [turn15, setTurn] = useContext(Turn15ClockContext);
  const [move10, setMove10] = useContext(Move10StpesContext);

  const [x, setX, y, setY] = useContext(XandYValuesContext);
  const [coord, setCoord] = useState({ x: 0, y: 0 });

  useEffect(
    (ev) => {
      console.log(turn15, "cccccturn15");
      const spriteSvg = document.querySelector("#sprite > svg");

      if (spriteSvg) {
        spriteSvg.style.position = "relative";

        spriteSvg.style.left = `${x}px`;
        spriteSvg.style.top = `${y}px`;
      }
      // console.log(x, y, "x,y");
    },
    [x, y, turn15]
  );

  useEffect(() => {
    setX((prev) => parseInt(prev) + 10 * Math.cos(turn15 * (Math.PI / 180)));
    setY((prev) => parseInt(prev) + 10 * Math.sin(turn15 * (Math.PI / 180)));
  }, [turn15, move10]);

  useEffect(() => {
    const spriteSvg = document.querySelector("#sprite > svg");
    if (spriteSvg) {
      spriteSvg.style.transform = `rotate(${turn15}deg)`;
    }
  }, [turn15]);

  useEffect(() => {
    const spriteSvg = document.querySelector("#sprite > svg");
    if (spriteSvg) {
      spriteSvg.addEventListener("click", () => {
        tooltipFunc("Hi there, did you call me?", 3);
      });
    }
  });

  useEffect(() => {
    // window.onload = addListeners;

    const spriteSvg = document.querySelector("#sprite > svg");
    if (spriteSvg) {
      spriteSvg.addEventListener("mousedown", (evt) => {
        spriteSvg.style.cursor = "move";
        spriteSvg.classList.add("draggable");
        makeDraggable(evt);
      });
    }

    var selectedElement = false;
    function makeDraggable(evt) {
      var svg = evt.target;
      svg.addEventListener("mousedown", startDrag);
      svg.addEventListener("mousemove", drag);
      svg.addEventListener("mouseup", endDrag);
      svg.addEventListener("mouseleave", endDrag);
      // console.log(svg, "svg");
      var selectedElement, offset;
      function startDrag(evt) {
        selectedElement = evt.target;
      }
      async function drag(evt) {
        if (selectedElement) {
          evt.preventDefault();
          var coordVal = await getMousePosition(evt);
          setCoord(coordVal);
        }
      }
      function endDrag(evt) {
        console.log("end dragg");
        selectedElement = null;
      }
      function getMousePosition(evt) {
        return {
          x: evt.offsetX,
          y: evt.offsetY,
        };
      }
    }
  });

  useEffect(() => {
    setX(coord.x);
    setY(coord.y);
    console.log(coord);
  }, [coord]);

  return (
    <div
      onDrop={(event) => dragDrop(event)}
      onDragOver={(event) => allowDrop(event)}
      onDrag={(event) => dragStart(event)}
      id="sprite"
      className="flex-none h-full w-full overflow-y-auto p-2 "
    >
      {/* <div> */}
      {spriteToggle ? <CatSprite /> : <BananaSprite />}
    </div>
  );
}
