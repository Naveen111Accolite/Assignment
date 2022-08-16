import React, { useEffect, useContext } from "react";
import BananaSprite from "./BananaSprite";
import CatSprite from "./CatSprite";
import { SelectedSVGContext } from "../context/SelectedSVGProvider";
import "../styles.css";

function SelectionArea() {
  const [selectedSVG, setSelectedSVG] = useContext(SelectedSVGContext);

  useEffect(() => {
    var svgAll = document
      .getElementById("allsprites")
      .getElementsByTagName("svg");

    if (svgAll) {
      for (let i = 0; i < svgAll.length; i++) {
        svgAll[i].setAttribute("width", "30px");
        svgAll[i].setAttribute("height", "32px");
        svgAll[i].setAttribute("viewBox", `0 0 100 100`);
      }
    }

    document.querySelector("#allsprites #CatSprite").classList.add("activeSVG");

    return () => {};
  }, []);

  useEffect(() => {
    let selectSVG = document.getElementById("allsprites");

    selectSVG.addEventListener("click", (ev) => {
      let findALLOtherSVGContainingACTIVE =
        document.querySelectorAll("#allsprites > div");

      findALLOtherSVGContainingACTIVE.forEach((ele) => {
        if (ele.classList.contains("activeSVG")) {
          ele.classList.remove("activeSVG");
        }
      });

      let setSVG = ev.target.parentNode;
      setSVG?.classList.add("activeSVG");
      setSelectedSVG(setSVG.id);
    });
  });

  useEffect(() => {
    let findALLOtherSVGContainingACTIVE =
      document.querySelectorAll("#allsprites > div");

    findALLOtherSVGContainingACTIVE.forEach((ele) => {
      if (ele.classList.contains("activeSVG")) {
        ele.classList.remove("activeSVG");
      }
    });

    let setSVG = document.querySelector(`#allsprites #${selectedSVG}`);
    setSVG?.classList.add("activeSVG");
    //   setSelectedSVG(setSVG.id);
  }, [selectedSVG]);

  let SelectedSpritesList1 = [<CatSprite />, <BananaSprite />];
  let SelectedSpritesList = [
    { name: "CatSprite", SVG: <CatSprite /> },
    { name: "BananaSprite", SVG: <BananaSprite /> },
  ];
  // let SelectedSpritesList1 = [CatSprite, BananaSprite];
  let SelectedSprites = SelectedSpritesList.map((sprite, indx) => (
    <div
      id={sprite.name}
      key={indx}
      className={`w-16 h-20 text-sm m-1 border-solid border-gray-300 border-2 rounded    `}
    >
      <div className={`z-100000 absolute w-14 h-20  -mt-1 -ml-1 `}></div>{" "}
      {/*bg-blue-400 */}
      <div className="flex justify-center items-center h-2/3">{sprite.SVG}</div>
      <div className="text-medium border-t-solid border-t-white border-t-2 box-border bg-blue-400 p-0.5 w-auto text-center">
        {sprite.name.slice(0, -6)}
      </div>
    </div>
  ));

  return (
    <div id="allsprites" className="overflow-hidden flex flex-column m-1 ">
      {/* <div className="w-1 h-1"> */}
      {SelectedSprites}
    </div>
  );
}

export default SelectionArea;
