export const midAreaClickHandler = (ev) => {
  let svg = document.querySelector("#sprite svg");
  let targetId = ev.target.id;

  function randomPos() {
    setX(Math.random() * 150);
    setY(Math.random() * 250);
  }

  if (ev.target.parentNode.id == "Parent" || ev.target.id == "Parent") {
    let parentId =
      ev.target.parentNode.getAttribute("data-parent-ts") ||
      ev.target.getAttribute("data-parent-ts");
    // let getIds = document.querySelectorAll("#Parent > div");
    let getIds = document.querySelectorAll(
      `[data-parent-ts="${parentId}"] > div`
    );

    let Ids = [];
    for (let i = 0; i < getIds.length; i++) {
      Ids.push(getIds[i]?.getAttribute("id"));
    }

    (async function loop() {
      for (let i = 0; i < Ids.length; i++) {
        await new Promise((resolve) => {
          setTimeout(() => {
            switchFunc(Ids[i]);
            resolve();
          }, 1000);
        });
      }
    })();
  }

  if (!(ev.target.parentNode.id == "Parent" || ev.target.id == "Parent")) {
    switchFunc(targetId);
  }
  function switchFunc(targetId) {
    switch (targetId) {
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

        svg.style.transition = `all ${glideValue.value}s`;
        randomPos();

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
        let pointToDir = document.querySelector("#midarea #pointToAngle input");
        setTurn(parseInt(pointToDir.value));
        break;
      }
      case "changeXby": {
        let xByValue = document.querySelector("#midarea #Xby");
        if (xByValue.value) {
          setX((prev) => parseInt(prev) + parseInt(xByValue.value));
        }
        break;
      }
      case "setXTo": {
        let setxByValue = document.querySelector("#midarea #setXToValue");
        setX(parseInt(setxByValue.value));
        break;
      }
      case "changeYby": {
        let yByValue = document.querySelector("#midarea #Yby");
        setY((prev) => parseInt(prev) + parseInt(yByValue?.value));

        break;
      }
      case "setYTo": {
        let setyByValue = document.querySelector("#midarea #setYToValue");
        setY(parseInt(setyByValue.value));
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
        break;
      }
      case "setColorEffectTo": {
        let changeColorEffectBy = document.querySelector(
          "#midarea #changeColorEffectBy"
        );
        svg.style.filter =
          "brightness(101.645%) contrast(122.62%) saturate(219.885%)";
        break;
      }
      case "setSizeTo": {
        let setSizeToValue = document.querySelector("#midarea #setSizeToInput");
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
        let waitForSec = document.querySelector("#midarea #waitForSec input");
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
      // case "reset": {
      //   let sprite = document.querySelector("#sprite");
      //   var tooltip = document.getElementById("tooltip");
      //   // var svg1 = document
      //   //   .getElementById("sprite")
      //   //   .getElementsByTagName("svg")[0];

      //   // sprite.innerHTML = svg.outerHTML;
      //   sprite.innerHTML = svg.outerHTML;

      //   setX(0);
      //   setY(0);
      //   setTurn(0);
      //   if (tooltip) tooltip.remove();

      //   //reset size
      //   // var svg1 = document
      //   //   .getElementById("sprite")
      //   //   .getElementsByTagName("svg")[0];

      //   // let resetVal = 100;

      //   // if (resetVal) {
      //   //   svg1.setAttribute("width", `${parseInt(resetVal)}` + "px");
      //   //   svg1.setAttribute("height", `${parseInt(resetVal)}` + "px");
      //   // }
      //   // svg1.setAttribute("viewBox", `${x} ${y} 100 100`);

      //   // //reset filter
      //   // svg1.style.filter =
      //   //   "brightness(101.645%) contrast(122.62%) saturate(219.885%)";
      //   break;
      // }
    }
  }
};