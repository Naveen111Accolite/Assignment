import React, {
  useEffect,
  useRef,
  useContext,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import Blockly from "blockly";
import "../styles.css";
import { Turn15ClockContext } from "../context/Turn15ClockProvider";
import { Move10StpesContext } from "../context/Move10Steps";
import { XandYValuesContext } from "../context/XandYValuesProvider";
import tooltipFunc from "../utils/Tooltip";
import { SelectedSVGContext } from "../context/SelectedSVGProvider";
import { CloneSpriteContext } from "../context/CloneSpriteProvider";
import CatSprite from "./CatSprite";
import BananaSprite from "./BananaSprite";
// import download from "../backdrops/download.jpg";

const MidArea = forwardRef(
  (
    {
      dragDrop,
      // dragOver,
      dragStart,
      ParentIdSelector,
      // setParentIdSelector,
      // selectedElementAttr,
      // spriteToggle,
      thisSVGClick,
      stop,
      backdropList,
      backdrop,
      setBackdrop,
      broadcast,
      setBroadcast,
      layer,
      setLayer,
      setStop,
    },
    ref
  ) => {
    const [turn15, setTurn] = useContext(Turn15ClockContext);
    const [move10, setMove10] = useContext(Move10StpesContext);
    const [x, setX, y, setY] = useContext(XandYValuesContext);
    const [selectedSVG, setSelectedSVG] = useContext(SelectedSVGContext);
    const [clonesprite, setClonesprite] = useContext(CloneSpriteContext);
    const stop1 = useRef(false);

    function allowDrop(ev) {
      ev.preventDefault();
    }

    function drag(event) {
      event.preventDefault();
    }

    let dragOver = (event) => {
      event.preventDefault();
    };

    useEffect((ev) => {
      function randomPos() {
        setX(Math.random() * 150);
        setY(Math.random() * 250);
      }

      let midarea = document.getElementById("midarea");

      midarea.addEventListener("drop", (event) => {
        event.preventDefault();
      });

      document.addEventListener("keydown", (e) => {
        let midareaKeypressBlocks = document.querySelectorAll(
          "#midarea #keyPress select"
        );

        for (let i = 0; i < midareaKeypressBlocks.length; i++) {
          let allKeyPress = [];
          if (midareaKeypressBlocks[i].value == e.key) {
            allKeyPress.push(midareaKeypressBlocks[i].parentNode);
          }
          switchLoopHandler(allKeyPress);
        }
      });
    }, []);

    async function switchFunc(targetId, idtimestamp) {
      let svg = document.querySelector("#sprite .SelectedSVGEle");

      function randomPos() {
        setX(Math.random() * 150);
        setY(Math.random() * 250);
      }

      function timeout(secs) {
        return new Promise((resolve) => setTimeout(resolve, secs * 1000));
      }

      switch (targetId) {
        case "when": {
          // tooltipFunc("Hello There", 3);
          // await timeout(3);
          break;
        }
        case "this": {
          // tooltipFunc("You clicked me", 3);
          // await timeout(3);
          break;
        }
        case "WhenBackdropSwitchesTo": {
          // tooltipFunc("You clicked me", 3);
          await timeout(0.5);
          break;
        }
        case "whenIReceiveBroadcast": {
          // setTurn((prev) => prev + 15);

          await timeout(0.5);

          break;
        }
        case "broadcast": {
          let broadcastValue = document.querySelector(
            `#midarea [data-ts="${idtimestamp}"] select`
          );
          setBroadcast(broadcastValue.value);
          broadcastFunc();
          await timeout(0.5);

          break;
        }
        case "turn15degclock": {
          setTurn((prev) => prev + 15);
          await timeout(0.5);

          break;
        }
        case "move10": {
          setMove10((prev) => prev + 10);
          await timeout(0.5);
          break;
        }
        case "turn15deganticlock": {
          setTurn((prev) => prev - 15);
          await timeout(0.5);
          break;
        }
        case "moveToRandomPos": {
          randomPos();
          await timeout(0.5);
          break;
        }
        case "goto": {
          let gotoXValue = document.querySelector(
            `#midarea [data-ts="${idtimestamp}"] #gotoX`
          );
          let gotoYValue = document.querySelector(
            `#midarea [data-ts="${idtimestamp}"] #gotoY`
          );

          setX(gotoXValue.value);
          setY(gotoYValue.value);
          await timeout(0.5);
          break;
        }
        case "glide": {
          let glideValue = document.querySelector(
            `#midarea [data-ts="${idtimestamp}"] #secs`
          );

          svg.style.transition = `all ${glideValue.value}s`;
          randomPos();

          svg.addEventListener("transitionend", () => {
            svg.style.transition = "none";
          });
          await timeout(parseInt(glideValue.value));
          break;
        }
        case "glidetoXY": {
          let glideXValue = document.querySelector(
            `#midarea [data-ts="${idtimestamp}"] #glideX`
          );
          let glideYValue = document.querySelector(
            `#midarea [data-ts="${idtimestamp}"] #glideY`
          );

          let glidetoXYValue = document.querySelector(
            `#midarea [data-ts="${idtimestamp}"] #secsforXY`
          );

          let glideSecs = glidetoXYValue.value || 0;

          svg.style.transition = `all ${glideSecs}s`;

          setX(parseInt(glideXValue.value));
          setY(parseInt(glideYValue.value));

          svg.addEventListener("transitionend", () => {
            svg.style.transition = "none";
          });

          await timeout(parseInt(glideSecs));
          break;
        }
        case "pointToAngle": {
          let pointToDir = document.querySelector(
            `#midarea #pointToAngle[data-ts="${idtimestamp}"]  input`
          );
          setTurn(parseInt(pointToDir.value));
          await timeout(0.5);
          break;
        }
        case "changeXby": {
          let xByValue = document.querySelector(
            `#midarea [data-ts="${idtimestamp}"] #Xby`
          );
          if (xByValue.value) {
            setX((prev) => parseInt(prev) + parseInt(xByValue.value));
          }
          await timeout(0.5);
          break;
        }
        case "setXTo": {
          let setxByValue = document.querySelector(
            `#midarea [data-ts="${idtimestamp}"] #setXToValue`
          );
          setX(parseInt(setxByValue.value));
          await timeout(0.5);
          break;
        }
        case "changeYby": {
          let yByValue = document.querySelector(
            `#midarea [data-ts="${idtimestamp}"] #Yby`
          );
          setY((prev) => parseInt(prev) + parseInt(yByValue?.value));
          await timeout(0.5);
          break;
        }
        case "setYTo": {
          let setyByValue = document.querySelector(
            `#midarea [data-ts="${idtimestamp}"] #setYToValue`
          );
          setY(parseInt(setyByValue.value));
          await timeout(0.5);
          break;
        }
        case "edgeBounce": {
          let left = parseInt(svg.style.left);
          let top = parseInt(svg.style.top);
          if (left < 0 && top < 0) {
            setX(parseInt(0));
            setY(parseInt(0));
          } else if (left < 0) {
            setX(parseInt(0));
          } else if (top < 0) {
            setY(parseInt(0));
          }
          await timeout(0.5);
          break;
        }
        case "sayHelloWithSecs": {
          let sayHelloTextValue = document.querySelector(
            `#midarea [data-ts="${idtimestamp}"] #sayHelloInput1`
          );
          let sayHelloSecsValue = document.querySelector(
            `#midarea [data-ts="${idtimestamp}"] #sayHellosecs`
          );
          if (sayHelloTextValue?.value) {
            tooltipFunc(
              sayHelloTextValue.value,
              parseInt(sayHelloSecsValue.value)
            );
          }
          await timeout(parseInt(sayHelloSecsValue.value));
          break;
        }

        case "sayHello": {
          let sayHelloOnlyTextValue = document.querySelector(
            `#midarea [data-ts="${idtimestamp}"] #sayHelloOnlyInput1`
          );
          // showTooltip();
          if (sayHelloOnlyTextValue?.value) {
            tooltipFunc(sayHelloOnlyTextValue.value);
          }
          break;
        }

        case "changeSizeBy": {
          let changeSizeByValue = document.querySelector(
            `#midarea [data-ts="${idtimestamp}"] #changeSizeByInput`
          );

          let widthSvg = parseInt(svg.getAttribute("width"));
          let heightSvg = parseInt(svg.getAttribute("height"));

          svg.setAttribute(
            "width",
            `${widthSvg + parseInt(changeSizeByValue?.value)}` + "px"
          );
          svg.setAttribute(
            "height",
            `${heightSvg + parseInt(changeSizeByValue?.value)}` + "px"
          );
          svg.setAttribute("viewBox", `0 0 100 100`);

          await timeout(0.5);
          break;
        }
        case "changeColorEffectBy": {
          let changeColorEffectBy = document.querySelector(
            `#midarea [data-ts="${idtimestamp}"] #changeColorEffectBy`
          );
          let changeColorEffectByValue = 25;
          svg.style.filter =
            "brightness(" +
            changeColorEffectByValue * 10 * Math.random() +
            "%) contrast(" +
            changeColorEffectByValue * 10 * Math.random() +
            "%) saturate(" +
            changeColorEffectByValue * 10 * Math.random() +
            "%)";
          await timeout(0.5);
          break;
        }
        case "setColorEffectTo": {
          svg.style.filter =
            "brightness(101.645%) contrast(122.62%) saturate(219.885%)";
          await timeout(0.5);
          break;
        }
        case "clearGraphicEffect": {
          svg.style.filter =
            "brightness(101.645%) contrast(122.62%) saturate(219.885%)";
          await timeout(0.5);
          break;
        }
        case "backdropSwitch": {
          let backdropValue = document.querySelector(
            `#midarea [data-ts="${idtimestamp}"] select`
          );
          let previewArea = document.getElementById("sprite");
          setBackdrop(backdropValue.value);

          // previewArea.style.backgroundColor = `${backdropValue.value}`;
          await timeout(0.5);
          break;
        }
        case "backdropNext": {
          let previewArea = document.getElementById("sprite");
          let index = backdropList.indexOf(backdrop);

          if (index != -1) {
            if (index < backdropList.length - 1) {
              // previewArea.style.backgroundColor = backdropList[index + 1];
              setBackdrop(backdropList[index + 1]);
            } else {
              // previewArea.style.backgroundColor = backdropList[0];
              setBackdrop(backdropList[0]);
            }
          }
          await timeout(0.5);
          break;
        }
        case "setSizeTo": {
          let setSizeToValue = document.querySelector(
            `#midarea [data-ts="${idtimestamp}"] #setSizeToInput`
          );

          if (setSizeToValue?.value) {
            svg.setAttribute(
              "width",
              `${parseInt(setSizeToValue.value)}` + "px"
            );
            svg.setAttribute(
              "height",
              `${parseInt(setSizeToValue.value)}` + "px"
            );
          }
          svg.setAttribute("viewBox", `0 0 100 100`);
          await timeout(0.5);
          break;
        }
        case "show": {
          svg.style.display = "block";
          await timeout(0.5);
          break;
        }
        case "hide": {
          svg.style.display = "none";
          await timeout(0.5);
          break;
        }
        case "goToFrontLayer": {
          setLayer((prev) => prev + 1);
          await timeout(0.5);
          break;
        }
        case "goToBackLayer": {
          if (layer >= 1) {
            setLayer((prev) => prev - 1);
          }
          await timeout(0.5);
          break;
        }
        case "waitForSec": {
          let waitForSec = document.querySelector(
            `#midarea [data-ts="${idtimestamp}"] #waitForSec input`
          );
          setTimeout(() => {
            randomPos();
          }, parseInt(waitForSec?.value) * 1000);
          await timeout(parseInt(waitForSec?.value));

          break;
        }
        case "repeat": {
          let repeatValue = document.querySelector(
            `#midarea [data-ts="${idtimestamp}"] #repeat input`
          );
          for (let i = 0; i < parseInt(repeatValue.value); i++) {
            // setTimeout(() => {
            randomPos();
            // }, i * 1000);
            await timeout(1);
          }

          break;
        }
        case "forever": {
          // let foreverValue = document.querySelector("#midarea #forever");
          for (let i = 0; i < 100; i++) {
            setTimeout(() => {
              randomPos();
            }, i * 1000);
            await timeout(1);
          }
          break;
        }
        case "ifElse": {
          let ifElseElement = document.querySelector(
            `#midarea [data-ts="${idtimestamp}"] #ifElse`
          );
          let pointToDir = document.querySelector(
            `#midarea #pointToAngle[data-ts="${idtimestamp}"]  input`
          );
          if (turn15 < 90) {
            setTurn((prev) => prev + 15);
          } else {
            setTurn(360 * Math.random());
          }
          await timeout(0.5);
          break;
        }
        case "createClone": {
          let sprite = document.querySelector("#sprite");
          svg.setAttribute("data-svg-ts", Date.now());
          setClonesprite([
            ...clonesprite,
            svg.id == "CatSprite" ? <CatSprite /> : <BananaSprite />,
          ]);
          // sprite.innerHTML += svg.outerHTML;
          await timeout(0.5);
          break;
        }
        case "reset": {
          let sprite = document.querySelector("#sprite");
          var tooltip = document.getElementById("tooltip");
          setClonesprite([]);

          setX(0);
          setY(0);
          setTurn(0);
          setBackdrop(null);

          if (tooltip) tooltip.remove();

          let resetVal = 100;

          if (resetVal) {
            svg.setAttribute("width", `${parseInt(resetVal)}` + "px");
            svg.setAttribute("height", `${parseInt(resetVal)}` + "px");
          }
          svg.setAttribute("viewBox", `0 0 100 100`);

          // //reset filter
          svg.style.filter =
            "brightness(101.645%) contrast(122.62%) saturate(219.885%)";
          break;
        }
      }
    }

    //to stop running
    useEffect(() => {
      if (stop) {
        stop1.current = true;
      } else {
        stop1.current = false;
      }
    }, [stop]);

    // if (stop1.current) return;

    ///executes each blocks one by one
    function switchFuncLoop(getIds) {
      let Ids = [];
      for (let i = 0; i < getIds.length; i++) {
        // Ids.push(getIds[i]?.getAttribute("id"));
        Ids.push({
          id: getIds[i]?.getAttribute("id"),
          timestamp: getIds[i]?.getAttribute("data-ts"),
        });
      }

      (async function loop() {
        for (let i = 0; i < Ids.length; i++) {
          // to stop running when 'red' stop button clicked
          if (stop1.current) break;
          //////////
          const switchfuncSetTimeout = await switchFunc(
            Ids[i]["id"],
            Ids[i]["timestamp"]
          );
        }
      })();
    }

    let midAreaClickHandler = (ev, targetid) => {
      let targetId = ev?.target?.id || targetid;
      if (ev.target.parentNode.id == "Parent" || targetId == "Parent") {
        let parentId =
          ev.target.parentNode.getAttribute("data-parent-ts") ||
          ev.target.getAttribute("data-parent-ts");
        let getIds = document.querySelectorAll(
          `[data-parent-ts="${parentId}"] > div`
        );

        switchFuncLoop(getIds);
      }

      if (!(ev.target.parentNode.id == "Parent" || ev.target.id == "Parent")) {
        let idtimestamp = ev.target.getAttribute("data-ts");
        // console.log("targetId", targetId, idtimestamp);
        switchFunc(targetId, idtimestamp);
      }
    };

    //flag click handler
    // let flagClick = document.querySelectorAll("#midarea #when");
    // useImperativeHandle(ref, () => ({
    //   flagClickHandler() {
    //     switchLoopHandler(flagClick);
    //   },
    // }));

    //function to loop through all blocks and execute one by one
    function switchLoopHandler(parentElements) {
      for (let i = 0; i < parentElements.length; i++) {
        let parentTS =
          parentElements[i]?.parentNode.getAttribute("data-parent-ts");
        let getIds = document.querySelectorAll(
          `[data-parent-ts="${parentTS}"] > div`
        );

        switchFuncLoop(getIds);
      }
    }

    //SVG on click apply changes
    useEffect(() => {
      let previewArea = document.getElementById("sprite");

      previewArea.addEventListener("click", (e) => {
        if (e.target?.closest("svg")?.classList.contains("SelectedSVGEle")) {
          let thisSVGClick = document.querySelectorAll("#midarea #this");
          switchLoopHandler(thisSVGClick);
        }
      });
    }, []);

    //flag click handler
    useEffect(() => {
      let flag = document.getElementById("flagDiv");
      if (flag) {
        flag.addEventListener("click", (e) => {
          let flagEvent = document.querySelectorAll("#midarea #when");
          switchLoopHandler(flagEvent);
        });
      }
    }, []);

    //reset to it's original values when SVG element changed
    useEffect(() => {
      let left = document.getElementById(selectedSVG)?.style.left;
      let top = document.getElementById(selectedSVG)?.style.top;
      let angle = document
        .getElementById(selectedSVG)
        ?.style.getPropertyValue("transform")
        .split("rotate(")[1]
        ?.split("deg")[0];
      setX(left ? parseInt(left) : 0);
      setY(top ? parseInt(top) : 0);

      setTurn(angle ? angle : 0);
    }, [selectedSVG]);

    //runs when backdrop changes
    useEffect(() => {
      //changes backdrop color
      let previewArea = document.getElementById("sprite");

      previewArea.style.backgroundColor = backdrop;
      console.log("backdrop changed to -", backdrop);

      //checks and executes respective blocks when backdrop matches
      let backdropEvent = document.querySelectorAll(
        "#midarea #WhenBackdropSwitchesTo"
      );
      let backdropswitchArr = [];
      for (let i = 0; i < backdropEvent.length; i++) {
        if (backdropEvent[i].querySelector("select").value == backdrop) {
          backdropswitchArr.push(backdropEvent[i]);
          // switchLoopHandler([backdropEvent[i]]);
        }
      }

      if (backdropswitchArr) {
        switchLoopHandler(backdropswitchArr);
      }
    }, [backdrop]);

    useEffect(() => {
      broadcastFunc();
    }, [broadcast]);

    function broadcastFunc() {
      let broadcastEvent = document.querySelectorAll(
        "#midarea #whenIReceiveBroadcast"
      );
      let broadcastswitchArr = [];
      for (let i = 0; i < broadcastEvent.length; i++) {
        if (broadcastEvent[i].querySelector("select").value == broadcast) {
          broadcastswitchArr.push(broadcastEvent[i]);
        }
      }

      if (broadcastswitchArr) {
        switchLoopHandler(broadcastswitchArr);
      }
    }

    useEffect(() => {
      let svg = document.querySelector("#sprite .SelectedSVGEle");
      if (svg) {
        svg.style.zIndex = `${layer}`;
      }
    }, [layer]);

    useEffect(() => {
      let parentNodes = document.querySelectorAll("#Parent");

      if (parentNodes) {
        for (let i = 0; i < parentNodes.length; i++) {
          if (parentNodes[i].childNodes.length == 0) {
            parentNodes[i].remove();
            console.log("No children");
          }
        }
      }
    });

    return (
      <div
        id="midarea"
        onDrop={(event) => dragDrop(event)}
        draggable="true"
        onDragOver={(event) => dragOver(event)}
        onDragStart={(event) => dragStart(event)}
        onDrag={(event) => drag(event)}
        className="flex-1 h-full overflow-auto flex-row "
        onClick={midAreaClickHandler}
      ></div>
    );
  }
);

export default MidArea;
