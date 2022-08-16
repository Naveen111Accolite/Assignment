import React, { useEffect, useContext, useState } from "react";
import CatSprite from "./CatSprite";
import BananaSprite from "./BananaSprite";
import { Turn15ClockContext } from "../context/Turn15ClockProvider";
import { Move10StpesContext } from "../context/Move10Steps";
import { XandYValuesContext } from "../context/XandYValuesProvider";
import { SelectedSVGContext } from "../context/SelectedSVGProvider";
import { CloneSpriteContext } from "../context/CloneSpriteProvider";
import tooltipFunc from "../utils/Tooltip";

import "../styles.css";

export default function PreviewArea({
  spriteToggle,
  setSpriteToggle,
  dragStart,
  dragDrop,
  setLayer,
  setStop,
}) {
  const [turn15, setTurn] = useContext(Turn15ClockContext);
  const [move10, setMove10] = useContext(Move10StpesContext);

  const [x, setX, y, setY] = useContext(XandYValuesContext);
  const [selectedSVG, setSelectedSVG] = useContext(SelectedSVGContext);
  const [clonesprite, setClonesprite] = useContext(CloneSpriteContext);

  const [coord, setCoord] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const spriteSvg = document.querySelector("#sprite > .SelectedSVGEle");

  useEffect(
    (ev) => {
      const spriteSvg = document.querySelector("#sprite > .SelectedSVGEle");

      if (spriteSvg) {
        spriteSvg.style.position = "relative";

        spriteSvg.style.left = `${x}px`;
        spriteSvg.style.top = `${y}px`;

        console.log(x, y, "x,y");
      }
    },
    [x, y, turn15]
  );

  useEffect(() => {
    setX((prev) => parseInt(prev) + 10 * Math.cos(turn15 * (Math.PI / 180)));
    setY((prev) => parseInt(prev) + 10 * Math.sin(turn15 * (Math.PI / 180)));
  }, [turn15, move10]);

  useEffect(() => {
    // const spriteSvg = document.querySelector("#sprite > svg");
    // const spriteSvg = document.querySelector("#sprite > .SelectedSVGEle");
    if (spriteSvg) {
      spriteSvg.style.transform = `rotate(${turn15}deg)`;
    }
  }, [turn15]);

  useEffect(() => {
    const spriteSvg = document.querySelector("#sprite > .SelectedSVGEle");

    if (spriteSvg) {
      spriteSvg.addEventListener("click", (e) => {
        if (e.target.closest(".SelectedSVGEle")) {
          // tooltipFunc("Hi there, did you call me?", 3);
        }
      });

      let sprite = document.querySelector("#sprite");

      sprite.addEventListener("dblclick", (e) => {
        //to set active element
        if (!e.target.closest(".SelectedSVGEle")) {
          let findOtherActiveSVG = document.querySelectorAll(
            "#sprite > .SelectedSVGEle"
          );
          let targetSVG = e.target.closest("svg");

          if (findOtherActiveSVG) {
            for (let i = 0; i < findOtherActiveSVG.length; i++) {
              findOtherActiveSVG[i].classList.remove("SelectedSVGEle");
            }
          }

          targetSVG?.classList.add("SelectedSVGEle");
          setSelectedSVG(targetSVG?.id);
        }

        let findALLOtherSVGContainingACTIVE =
          document.querySelectorAll("#allsprites > div");

        findALLOtherSVGContainingACTIVE.forEach((ele) => {
          if (ele.classList.contains("activeSVG")) {
            ele.classList.remove("activeSVG");
          }
        });

        let setSVG = document.querySelector(`#allsprites #${selectedSVG}`);
        setSVG?.classList.add("activeSVG");
      });
    }
  });

  //when selected move to top layer
  useEffect(() => {
    setLayer((prev) => prev + 1);
  }, [selectedSVG]);

  useEffect(
    (evt) => {
      // let svg = document.querySelector("#sprite > .SelectedSVGEle");
      let svg = document.querySelector("#sprite ");
      let svgAll = document.querySelectorAll("#sprite > svg");

      if (svg) {
        var click = false; // flag to indicate when shape has been clicked
        var clickX, clickY; // stores cursor location upon first click
        var moveX = 0,
          moveY = 0; // keeps track of overall transformation
        var lastMoveX = 0,
          lastMoveY = 0; // stores previous transformation (move)

        svg.addEventListener("mousedown", mouseDown);

        function mouseDown(evt) {
          // let svg = document.querySelector("#sprite > .SelectedSVGEle");

          evt.preventDefault(); // Needed for Firefox to allow dragging correctly
          click = true;
          clickX = evt.clientX;
          clickY = evt.clientY;

          let svgEle = evt?.target?.closest("svg");
          let ActivesvgEle = svgEle?.classList.contains("SelectedSVGEle");

          if (ActivesvgEle) svgEle.addEventListener("mousemove", move);
          svg.addEventListener("mouseup", endMove);

          for (let i = 0; i < svgAll.length; i++) {
            svgAll[i].removeAttribute("transform");
          }
        }

        function move(evt) {
          evt.preventDefault();
          if (click) {
            moveX = evt.clientX - clickX;
            moveY = evt.clientY - clickY;
            let svgEle = evt?.target?.closest("svg");

            let ActivesvgEle = svgEle?.classList.contains("SelectedSVGEle");

            if (ActivesvgEle)
              svgEle.setAttribute(
                "transform",
                "translate(" + moveX + "," + moveY + ")"
              );
          }
        }

        function endMove(evt) {
          click = false;
          lastMoveX = moveX;
          lastMoveY = moveY;

          let svgEle = evt?.target?.closest("svg");

          let ActivesvgEle = svgEle?.classList.contains("SelectedSVGEle");

          if (ActivesvgEle) {
            svgEle.removeEventListener("mousemove", move);
          }
          svg.removeEventListener("mouseup", endMove);

          for (let i = 0; i < svgAll.length; i++) {
            svgAll[i].removeAttribute("transform");
          }

          setX(lastMoveX + x);
          setY(lastMoveY + y);
        }
      }
    },
    [x, y]
  );

  useEffect(() => {
    console.log("selectedSVG", selectedSVG);

    function setActiveSVGEle(svg) {
      let AllSVGs = document.querySelectorAll("#sprite > svg");
      AllSVGs.forEach((ele) => {
        if (ele.classList.contains("SelectedSVGEle")) {
          ele.classList.remove("SelectedSVGEle");
        }
      });

      let ele = document.getElementById(selectedSVG);
      if (ele) {
        ele.classList.add("SelectedSVGEle");
      }
    }

    setActiveSVGEle();
  }, [selectedSVG]);

  return (
    <div
      onDrop={(event) => dragDrop(event)}
      onDragStart={(event) => dragStart(event)}
      id="sprite"
      className="flex-none h-3/5 w-full overflow-y-auto p-2 rounded  "
      onMouseDown={() => setStop(false)}
    >
      {<CatSprite />}
      {<BananaSprite />}
      {clonesprite}
    </div>
  );
}
