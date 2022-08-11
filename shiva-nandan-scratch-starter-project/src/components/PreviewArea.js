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
}) {
  const [turn15, setTurn] = useContext(Turn15ClockContext);
  const [move10, setMove10] = useContext(Move10StpesContext);

  const [x, setX, y, setY] = useContext(XandYValuesContext);
  const [selectedSVG, setSelectedSVG] = useContext(SelectedSVGContext);
  const [clonesprite, setClonesprite] = useContext(CloneSpriteContext);

  const [coord, setCoord] = useState({ x: 0, y: 0 });

  const spriteSvg = document.querySelector("#sprite > .SelectedSVGEle");

  useEffect(
    (ev) => {
      const spriteSvg = document.querySelector("#sprite > .SelectedSVGEle");

      // console.log(turn15, "cccccturn15");
      // const spriteSvg = document.querySelector("#sprite > .SelectedSVGEle");

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
          tooltipFunc("Hi there, did you call me?", 3);
        }
      });

      let sprite = document.querySelector("#sprite");

      sprite.addEventListener("dblclick", (e) => {
        //to set active element
        if (!e.target.closest(".SelectedSVGEle")) {
          // console.log("e.target---", e.target.closest("svg"));
          let findOtherActiveSVG = document.querySelectorAll(
            "#sprite > .SelectedSVGEle"
          );
          let targetSVG = e.target.closest("svg");
          // console.log("targetSVG", targetSVG.id, findOtherActiveSVG);

          if (findOtherActiveSVG) {
            for (let i = 0; i < findOtherActiveSVG.length; i++) {
              findOtherActiveSVG[i].classList.remove("SelectedSVGEle");
            }
          }

          targetSVG.classList.add("SelectedSVGEle");
          setSelectedSVG(targetSVG.id);
          // console.log("targetSVG", targetSVG.id, findOtherActiveSVG);

          // return;
        }

        let findALLOtherSVGContainingACTIVE =
          document.querySelectorAll("#allsprites > div");

        findALLOtherSVGContainingACTIVE.forEach((ele) => {
          if (ele.classList.contains("activeSVG")) {
            ele.classList.remove("activeSVG");
          }
        });

        let setSVG = document.querySelector(`#allsprites #${selectedSVG}`);
        setSVG.classList.add("activeSVG");

        // console.log("e.target-22222--", e.target.closest("svg"));
      });
    }
  });

  // useEffect(() => {
  //   // window.onload = addListeners;

  //   const spriteSvg = document.querySelector("#sprite > svg");
  //   if (spriteSvg) {
  //     spriteSvg.addEventListener("mousedown", (evt) => {
  //       spriteSvg.style.cursor = "move";
  //       spriteSvg.classList.add("draggable");
  //       makeDraggable(evt);
  //     });
  //   }

  //   var selectedElement = false;
  //   function makeDraggable(evt) {
  //     var svg = evt.target;
  //     svg.addEventListener("mousedown", startDrag);
  //     svg.addEventListener("mousemove", drag);
  //     svg.addEventListener("mouseup", endDrag);
  //     svg.addEventListener("mouseleave", endDrag);
  //     // console.log(svg, "svg");
  //     var selectedElement, offset;
  //     function startDrag(evt) {
  //       selectedElement = evt.target;
  //     }
  //     async function drag(evt) {
  //       if (selectedElement) {
  //         evt.preventDefault();
  //         var coordVal = await getMousePosition(evt);
  //         setCoord(coordVal);
  //       }
  //     }
  //     function endDrag(evt) {
  //       console.log("end dragg");
  //       selectedElement = null;
  //     }
  //     function getMousePosition(evt) {
  //       return {
  //         x: evt.offsetX,
  //         y: evt.offsetY,
  //       };
  //     }
  //   }
  // });

  // useEffect(() => {
  //   setX(coord.x);
  //   setY(coord.y);
  //   console.log(coord);
  // }, [coord]);

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
        // console.log("ele", ele.id);
        ele.classList.add("SelectedSVGEle");
      }
    }

    setActiveSVGEle();
  }, [selectedSVG]);

  // function setActiveSVGEle(svg) {
  //   let AllSVGs = document.querySelectorAll("#sprite > svg");
  //   AllSVGs.forEach((ele) => {
  //     if (ele.classList.contains("SelectedSVGEle")) {
  //       ele.classList.remove("SelectedSVGEle");
  //     }
  //   });

  //   let ele = document.getElementById(selectedSVG);
  //   if (ele) {
  //     console.log("ele", ele.id);
  //     ele.classList.add("SelectedSVGEle");
  //   }
  // }

  // let selectedSVGElement = spriteToggle ? <CatSprite /> : <BananaSprite />;
  // let selectedSVGElement1 = function selectSVG() {
  //   switch (selectedSVG) {
  //     case "CatSprite": {
  //       setActiveSVGEle();
  //     }
  //     case "BananaSprite": {
  //       setActiveSVGEle();
  //     }
  //   }
  // };

  // function thisClickHandler(e) {
  //   let thisClick = document.querySelectorAll("#midarea #this");

  //   for (let i = 0; i < thisClick.length; i++) {
  //     let parentTS = thisClick[i]?.parentNode.getAttribute("data-parent-ts");
  //     let getIds = document.querySelectorAll(
  //       `[data-parent-ts="${parentTS}"] > div`
  //     );

  //     switchFuncLoop(getIds);
  //   }
  // }

  return (
    <div
      onDrop={(event) => dragDrop(event)}
      // onDragOver={(event) => allowDrop(event)}
      onDragStart={(event) => dragStart(event)}
      id="sprite"
      className="flex-none h-3/5 w-full overflow-y-auto p-2 rounded  "
    >
      {/* {selectedSVGElement1()} */}
      {<CatSprite />}
      {<BananaSprite />}
      {clonesprite}
    </div>
  );
}
