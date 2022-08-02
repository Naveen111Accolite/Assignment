import React, { useEffect, useRef, useContext } from "react";
import Blockly from "blockly";
import "../styles.css";
import { Turn15ClockContext } from "../context/Turn15ClockProvider";
import { Move10StpesContext } from "../context/Move10Steps";
import { XandYValuesContext } from "../context/XandYValuesProvider";
import tooltipFunc from "../utils/Tooltip";

export default function MidArea({ setRandom }) {
  const [turn15, setTurn] = useContext(Turn15ClockContext);
  const [move10, setMove10] = useContext(Move10StpesContext);
  const [x, setX, y, setY] = useContext(XandYValuesContext);

  const blocklyDiv = useRef("");

  // useEffect(() => {
  //   var workspace = Blockly.inject('blocklyDiv');

  //   function myUpdateFunction(event) {
  //     var code = Blockly.JavaScript.workspaceToCode(workspace);
  //     // document.getElementById('textarea').value = code;
  //     console.log(code);
  //   }
  //   workspace.addChangeListener(myUpdateFunction);
  // })

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function dragDrop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    // ev.target.appendChild(document.getElementById(data));
    ev.target.appendChild(document.getElementById(data).cloneNode(true));
  }

  function dragStart(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    var data = ev.dataTransfer.getData("text");
  }

  useEffect((ev) => {
    function randomPos() {
      setX(Math.random() * 150);
      setY(Math.random() * 250);
    }
    document.getElementById("midarea").addEventListener(
      "click",
      (ev) => {
        // ev.preventDefault();
        // ev.stopPropagation();
        console.log(ev.target.id);

        let svg = document.querySelector("#sprite svg");

        switch (ev.target.id) {
          case "when": {
            tooltipFunc("Hello There", 3);
            break;
          }
          case "this": {
            tooltipFunc("You clicked me", 3);
            break;
          }
          case "turn15degclock": {
            setTurn((prev) => prev + 15);
            console.log("helllooo turn");
            break;
          }
          case "move10": {
            setMove10((prev) => prev + 10);
            break;
          }
          case "turn15deganticlock": {
            setTurn((prev) => prev - 15);
            break;
          }
          case "moveToRandomPos": {
            randomPos();
            break;
          }
          case "goto": {
            let gotoXValue = document.querySelector("#midarea #gotoX");
            let gotoYValue = document.querySelector("#midarea #gotoY");

            setX(gotoXValue.value);
            setY(gotoYValue.value);
            break;
          }
          case "glide": {
            let glideValue = document.querySelector("#midarea #secs");

            // svg.addEventListener("transitionstart", () => {});
            svg.style.transition = `all ${glideValue.value}s`;
            randomPos();
            console.log(glideValue.value, x, y, "glideValue");

            svg.addEventListener("transitionend", () => {
              svg.style.transition = "none";
            });
            break;
          }
          case "glidetoXY": {
            let glideXValue = document.querySelector("#midarea #glideX");
            let glideYValue = document.querySelector("#midarea #glideY");

            let glidetoXYValue = document.querySelector("#midarea #secsforXY");
            let svg = document.querySelector("#sprite svg");

            let glideSecs = glidetoXYValue.value || 0;

            svg.style.transition = `all ${glideSecs}s`;

            setX(parseInt(glideXValue.value));
            setY(parseInt(glideYValue.value));

            svg.addEventListener("transitionend", () => {
              svg.style.transition = "none";
            });
            break;
          }
          case "pointToAngle": {
            let pointToDir = document.querySelector(
              "#midarea #pointToAngle input"
            );
            setTurn(parseInt(pointToDir.value));
            // console.log(pointToDir.value);
            break;
          }
          case "changeXby": {
            let xByValue = document.querySelector("#midarea #Xby");
            if (xByValue.value) {
              setX((prev) => parseInt(prev) + parseInt(xByValue.value));
            }
            console.log(xByValue.value, "xByValue.value");
            break;
          }
          case "setXTo": {
            let setxByValue = document.querySelector("#midarea #setXToValue");
            setX(parseInt(setxByValue.value));
            // console.log(setxByValue.value, "setxByValue");
            break;
          }
          case "changeYby": {
            let yByValue = document.querySelector("#midarea #Yby");
            setY((prev) => parseInt(prev) + parseInt(yByValue?.value));

            console.log(yByValue.value, "yByValue");
            break;
          }
          case "setYTo": {
            let setyByValue = document.querySelector("#midarea #setYToValue");
            setY(parseInt(setyByValue.value));
            // console.log(setxByValue.value, "setxByValue");
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
            break;
          }
          case "sayHelloWithSecs": {
            let sayHelloTextValue = document.querySelector(
              "#midarea #sayHelloInput1"
            );
            let sayHelloSecsValue = document.querySelector(
              "#midarea #sayHellosecs"
            );
            if (sayHelloTextValue?.value) {
              tooltipFunc(
                sayHelloTextValue.value,
                parseInt(sayHelloSecsValue.value)
              );
            }
            break;
          }

          case "sayHello": {
            let sayHelloOnlyTextValue = document.querySelector(
              "#midarea #sayHelloOnlyInput1"
            );
            // showTooltip();
            if (sayHelloOnlyTextValue?.value) {
              tooltipFunc(sayHelloOnlyTextValue.value);
            }
            break;
          }

          case "changeSizeBy": {
            let changeSizeByValue = document.querySelector(
              "#midarea #changeSizeByInput"
            );
            var svg1 = document
              .getElementById("sprite")
              .getElementsByTagName("svg")[0];
            let widthSvg = parseInt(svg1.getAttribute("width"));
            let heightSvg = parseInt(svg1.getAttribute("height"));

            svg1.setAttribute(
              "width",
              `${widthSvg + parseInt(changeSizeByValue?.value)}` + "px"
            );
            svg1.setAttribute(
              "height",
              `${heightSvg + parseInt(changeSizeByValue?.value)}` + "px"
            );
            svg1.setAttribute("viewBox", `${x} ${y} 100 100`);

            console.log("changeSizeBy");
            break;
          }
          case "changeColorEffectBy": {
            let changeColorEffectBy = document.querySelector(
              "#midarea #changeColorEffectBy"
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
            console.log("changeColorEffectBy");
            break;
          }
          case "setColorEffectTo": {
            let changeColorEffectBy = document.querySelector(
              "#midarea #changeColorEffectBy"
            );
            svg.style.filter =
              "brightness(101.645%) contrast(122.62%) saturate(219.885%)";
            // console.log("changeColorEffectBy");
            break;
          }
          case "setSizeTo": {
            let setSizeToValue = document.querySelector(
              "#midarea #setSizeToInput"
            );
            var svg1 = document
              .getElementById("sprite")
              .getElementsByTagName("svg")[0];

            if (setSizeToValue?.value) {
              svg1.setAttribute(
                "width",
                `${parseInt(setSizeToValue.value)}` + "px"
              );
              svg1.setAttribute(
                "height",
                `${parseInt(setSizeToValue.value)}` + "px"
              );
            }
            svg1.setAttribute("viewBox", `${x} ${y} 100 100`);
            // console.log("setSizeTo");
            break;
          }
          case "show": {
            svg.style.display = "block";
            break;
          }
          case "hide": {
            svg.style.display = "none";
            break;
          }
          case "waitForSec": {
            let waitForSec = document.querySelector(
              "#midarea #waitForSec input"
            );
            setTimeout(() => {
              randomPos();
            }, parseInt(waitForSec?.value) * 1000);
            break;
          }
          case "repeat": {
            let repeatValue = document.querySelector("#midarea #repeat input");
            for (let i = 0; i < parseInt(repeatValue.value); i++) {
              setTimeout(() => {
                randomPos();
              }, i * 1000);
            }
            break;
          }
          case "forever": {
            // let foreverValue = document.querySelector("#midarea #forever");
            for (let i = 0; i < 100; i++) {
              setTimeout(() => {
                randomPos();
              }, i * 1000);
            }
            break;
          }
          case "ifElse": {
            let ifElseElement = document.querySelector("#midarea #ifElse");
            let pointToDir = document.querySelector("#pointToAngle input");
            console.log("turn15", pointToDir.value, turn15, x, y);
            if (pointToDir.value < 90) {
              setTurn((prev) => prev + 15);
            } else {
              setTurn(360 * Math.random());
            }
            break;
          }
          case "createClone": {
            let sprite = document.querySelector("#sprite");

            sprite.innerHTML += svg.outerHTML;
            break;
          }
          case "reset": {
            let sprite = document.querySelector("#sprite");
            var tooltip = document.getElementById("tooltip");
            // var svg1 = document
            //   .getElementById("sprite")
            //   .getElementsByTagName("svg")[0];

            sprite.innerHTML = svg.outerHTML;
            setX(0);
            setY(0);
            setTurn(0);
            if (tooltip) tooltip.remove();

            //reset size
            var svg1 = document
              .getElementById("sprite")
              .getElementsByTagName("svg")[0];

            let resetVal = 100;

            if (resetVal) {
              svg1.setAttribute("width", `${parseInt(resetVal)}` + "px");
              svg1.setAttribute("height", `${parseInt(resetVal)}` + "px");
            }
            svg1.setAttribute("viewBox", `${x} ${y} 100 100`);

            //reset filter
            svg1.style.filter =
              "brightness(101.645%) contrast(122.62%) saturate(219.885%)";
            break;
          }
        }
      },
      true
    );
    document.addEventListener("keydown", (e) => {
      let midareaKeypressBlock = document.querySelector(
        "#midarea #keyPress select"
      );
      // console.log(midareaKeypressBlock.value, "midareaKeypressBlock");
      if (midareaKeypressBlock) {
        switch (e.key) {
          case midareaKeypressBlock.value: {
            console.log("arrowup");
            randomPos();
            break;
          }
          case midareaKeypressBlock.value: {
            console.log("ArrowDown");
            randomPos();
            break;
          }

          case midareaKeypressBlock.value: {
            console.log("ArrowRight");
            randomPos();
            break;
          }
          case midareaKeypressBlock.value: {
            console.log("ArrowLeft");
            randomPos();

            break;
          }
        }
      }
    });
  }, []);

  // useEffect(() => {
  //   // console.log(turn15, "turn15");
  //   console.log(turn15AC, "turn15deganticlock");
  // }, [turn15AC]);

  return (
    <div
      id="midarea"
      onDrop={(event) => dragDrop(event)}
      draggable="true"
      onDragOver={(event) => allowDrop(event)}
      onDragStart={(event) => dragStart(event)}
      ref={blocklyDiv}
      // onClick={(event) => clickHandler(event)}
      className="flex-1 h-full overflow-auto flex-row"
    ></div>
  );
}
