import React, { useEffect, useContext } from "react";
import CatSprite from "./CatSprite";
import BananaSprite from "./BananaSprite";
import { Turn15ClockContext } from "../context/Turn15ClockProvider";
import { Move10StpesContext } from "../context/Move10Steps";
import { XandYValuesContext } from "../context/XandYValuesProvider";
import tooltipFunc from "../utils/Tooltip";

import "../styles.css";

export default function PreviewArea({ spriteToggle, setSpriteToggle }) {
  const [turn15, setTurn] = useContext(Turn15ClockContext);
  const [move10, setMove10] = useContext(Move10StpesContext);

  const [x, setX, y, setY] = useContext(XandYValuesContext);

  useEffect(
    (ev) => {
      console.log(turn15, "cccccturn15");
      const spriteSvg = document.querySelector("#sprite > svg");

      spriteSvg.style.position = "relative";

      spriteSvg.style.left = `${x}px`;
      spriteSvg.style.top = `${y}px`;

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

    spriteSvg.style.transform = `rotate(${turn15}deg)`;
  }, [turn15]);

  useEffect(() => {
    const spriteSvg = document.querySelector("#sprite > svg");
    spriteSvg.addEventListener("click", () => {
      tooltipFunc("Hi there, did you call me?", 3);
    });
  });

  return (
    <div id="sprite" className="flex-none h-full w-full overflow-y-auto p-2 ">
      {/* <div> */}
      {spriteToggle ? <CatSprite /> : <BananaSprite />}
    </div>
  );
}
