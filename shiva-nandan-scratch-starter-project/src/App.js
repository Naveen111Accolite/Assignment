import React, { useState, useEffect, useRef, useContext } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import ToggleSprite from "./components/ToggleSprite";
import SelectionArea from "./components/SelectionArea";
import Icon from "./components/Icon";
import { XandYValuesContext } from "./context/XandYValuesProvider";
import { Turn15ClockContext } from "./context/Turn15ClockProvider";
import Modal from "./components/Modal";
import snapElements from "./Instructions/snapele.png";
// import images from "./images/images.jpg";

export default function App() {
  const [spriteToggle, setSpriteToggle] = useState(true);
  const [ParentIdSelector, setParentIdSelector] = useState();
  const [selectedElementAttr, setSelectedElementAttr] = useState();
  const [dragParent, setDragParent] = useState();
  const [stop, setStop] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const flagRef = useRef();

  const [x, setX, y, setY] = useContext(XandYValuesContext);
  const [turn15, setTurn] = useContext(Turn15ClockContext);

  let backdropList = ["red", "blue", "green"];
  const [backdrop, setBackdrop] = useState();

  let broadcastList = ["Hi", "Hello"];
  const [broadcast, setBroadcast] = useState(null);

  const [layer, setLayer] = useState(0);

  function dragDrop2(ev) {
    ev.preventDefault();
    //delete elements from midarea when dropped to sidebar section
    var data = ev.dataTransfer.getData("text").split(",");
    var eleSelectedTodrop =
      document.querySelector(`#midarea [data-ts="${data[1]}"]`) ||
      document.querySelector(`#midarea [data-parent-ts="${dragParent}"]`);
    // document.querySelector(`#midarea #${data[0]}`).remove();
    if (eleSelectedTodrop) {
      eleSelectedTodrop.remove();
    }

    //remove parent element when directly dropped all children to drop/delete zone
    let parentNode = document.getElementById("Parent");
    if (parentNode) {
      if (parentNode.childNodes.length == 0) {
        parentNode.remove();
      }
    }
  }

  let sidebar = document.getElementById("sidebar");
  let midarea = document.getElementById("midarea");

  useEffect(() => {
    if (sidebar) {
      sidebar.addEventListener("mousedown", (e) => {
        let targetEle = e.target;
        setParentIdSelector(targetEle.parentNode.id);
        setSelectedElementAttr(targetEle.getAttribute("data-ts"));
      });
    }

    if (midarea) {
      midarea.addEventListener("mousedown", (e) => {
        let targetEle = e.target;
        setParentIdSelector(e.target.parentNode.id);
        setSelectedElementAttr(targetEle.getAttribute("data-ts"));
      });
    }
  });

  let onDragStart = function (ev) {
    // ev.preventDefault();
    let targetElement = ev.target;
    const rect = ev.target.getBoundingClientRect();
    // console.log("targetElement", targetElement, rect.left, rect.top);

    if (targetElement.getAttribute("data-parent-ts")) {
      setDragParent(targetElement.getAttribute("data-parent-ts"));
    }
    if (ParentIdSelector == "midarea") {
      let timestamp = targetElement.getAttribute("data-ts");
      let myData = targetElement.id + "," + timestamp;
      ev.dataTransfer.setData("text", myData);
      return;
    }
    let timestamp = Date.now();

    let myData = targetElement.id + "," + timestamp;
    ev.dataTransfer.setData("text", myData);
    targetElement.setAttribute("data-ts", timestamp);
    setParentIdSelector(ev.target.parentNode.id);
  };

  useEffect(() => {
    let parentElements = document.querySelectorAll("#Parent");
    if (parentElements) {
      for (let i = 0; i <= parentElements.length; i++) {
        parentElements[i]?.setAttribute("draggable", true);
        parentElements[i]?.addEventListener("dragenter", () => {
          parentElements[i]?.classList.add("ParentHighlight");
        });
        parentElements[i]?.addEventListener("drag", () => {
          parentElements[i]?.classList.add("ParentHighlight");
        });
        parentElements[i]?.addEventListener("dragover", () => {
          parentElements[i]?.classList.add("ParentHighlight");
        });

        parentElements[i]?.addEventListener("dragleave", () => {
          parentElements[i]?.classList.remove("ParentHighlight");
        });
        parentElements[i]?.addEventListener("drop", () => {
          parentElements[i]?.classList.remove("ParentHighlight");
        });
      }
    }
  });

  function dragDrop(e) {
    e.preventDefault();

    var data = e.dataTransfer.getData("text").split(",");
    var parentData = e.target.getAttribute("data-parent-ts");

    // let eleSelected = document.querySelector(`#midarea #${data[0]}`);
    let eleSelected =
      document.querySelector(`#midarea [data-ts="${data[1]}"]`) ||
      document.querySelector(`[data-parent-ts="${dragParent}"]`);
    // ||
    // document.querySelector(`#midarea [data-parent-ts="${data[1]}"]`);
    var rect = e.target.getBoundingClientRect();
    const coordinates = [e.pageX - rect.left, e.pageY - rect.top];

    if (eleSelected) {
      var dropValues = eleSelected.getBoundingClientRect();
    }

    if (e.target.parentNode.id == "sidebar") {
      console.log("droppeedddddddd");
    }

    if (ParentIdSelector == "midarea" || ParentIdSelector == "Parent") {
      // e.target.appendChild(document.querySelector(`#midarea #${data}`));
      // ev.target.appendChild(document.getElementById(data));
      if (eleSelected) {
        if (ParentIdSelector == "Parent") {
          eleSelected.style.left = e.clientX - 240 + "px";
          eleSelected.style.top = e.clientY + "px";
          document.getElementById("midarea").appendChild(eleSelected);
        }

        if (
          (ParentIdSelector == "midarea" && e.target.id == "midarea") ||
          (ParentIdSelector == "Parent" && e.target.id == "midarea")
        ) {
          eleSelected.style.position = "absolute";

          eleSelected.style.left =
            e.clientX - eleSelected.offsetWidth / 2 + "px";
          eleSelected.style.top =
            e.clientY - eleSelected.offsetHeight / 2 + "px";
        }
      }
    } else if (
      e.target.id == "midarea" &&
      ParentIdSelector != "midarea" &&
      ParentIdSelector != "Parent"
    ) {
      // let clone = document.getElementById(data[0]).cloneNode(true);
      let clone = document
        .querySelector(`[data-ts="${data[1]}"]`)
        .cloneNode(true);
      clone.style.position = "absolute";
      clone.style.left = e.clientX - 70 + "px";
      clone.style.top = e.clientY - 16 + "px";
      e.target.appendChild(clone);
    }

    let parentNode = document.getElementById("Parent");

    if (parentNode) {
      if (parentNode.childNodes.length == 0) {
        parentNode.remove();
        console.log("No children");
      }
    }

    // console.log("e.target.id", e.target.id);

    if (e.target.id != "midarea") {
      // alert("hello");
      let targetElementTS =
        e.target.getAttribute("data-ts") ||
        e.target.getAttribute("data-parent-ts");
      // const targetEle = document.querySelector(`#midarea #${e.target.id}`);
      if (e.target.getAttribute("data-ts")) {
        var targetEle = document.querySelector(
          `#midarea [data-ts="${targetElementTS}"]`
        );
      } else if (e.target.getAttribute("data-parent-ts")) {
        var targetEle = document.querySelector(
          `#midarea [data-parent-ts="${targetElementTS}"]`
        );
      }

      if (ParentIdSelector == "midarea") {
        var droppedEle = document.querySelector(
          `#midarea [data-ts="${data[1]}"]`
        );
        // console.log("dropped midarea");
      } else if (
        ParentIdSelector == "Parent" &&
        e.target.parentNode.id == "Parent"
      ) {
        var droppedEle = document.querySelector(`[data-ts="${data[1]}"]`);
      } else if (ParentIdSelector == "Parent" && e.target.id == "Parent") {
        var droppedEle = document.querySelector(`[data-ts="${data[1]}"]`);
      } else if (
        ParentIdSelector == "Parent" &&
        e.target.parentNode.id != "Parent"
      ) {
        var droppedEle = document.querySelector(`[data-ts="${data[1]}"]`);
      } else {
        var droppedEle = document
          .querySelector(`[data-ts="${data[1]}"]`)
          .cloneNode(true);
      }

      function snapElements() {
        const createEle = document.createElement("div");
        // createEle.classList.add("Parent");
        let timestampParent = Date.now();
        createEle.setAttribute("id", "Parent");
        createEle.setAttribute("data-parent-ts", timestampParent);
        createEle.style.position = "absolute";
        createEle.style.left = e.clientX - 60 - createEle?.offsetWidth + "px";
        createEle.style.top = e.clientY - 30 - createEle?.offsetHeight + "px";
        midarea.appendChild(createEle);
        createEle.appendChild(targetEle);
      }

      if (!(e.target.parentNode.id == "Parent" || e.target.id == "Parent")) {
        snapElements();
      }

      if (!(e.target.id == "Parent")) {
        targetEle.style.position = "relative";
        targetEle.style.left = "0px";
        targetEle.style.top = "0px";
        targetEle.style.margin = "0px 0px";
      }

      droppedEle.style.position = "relative";
      droppedEle.style.left = "0px";
      droppedEle.style.top = "0px";
      droppedEle.style.margin = "0px 0px";

      // console.log("droppedele", droppedEle, targetEle);

      if (
        droppedEle.id == "when" ||
        droppedEle.id == "this" ||
        droppedEle.id == "keyPress" ||
        droppedEle.id == "WhenBackdropSwitchesTo" ||
        droppedEle.id == "whenIReceiveBroadcast"
      ) {
        let parentEle = e.target.parentNode;
        let parentTarget = e.target;
        if (parentEle.id == "Parent") {
          parentEle.insertAdjacentElement("afterbegin", droppedEle);
        } else if (parentTarget.id == "Parent") {
          parentTarget.insertAdjacentElement("afterbegin", droppedEle);
        }

        return;
      }

      if (e.target.id == "Parent") {
        targetEle.insertAdjacentElement("beforeend", droppedEle);
      } else {
        targetEle.after(droppedEle);
      }
    }
  }

  function stopAll() {
    var tooltip = document.getElementById("tooltip");

    if (tooltip) tooltip.remove();
    setStop(true);
    return;
  }

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (e.target.closest("div").id != "stop") {
        setStop(false);
      }
    });
  }, []);

  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row  ">
        {openModal && <Modal setOpenModal={setOpenModal} />}

        {/* <ToggleSprite
          spriteToggle={spriteToggle}
          setSpriteToggle={setSpriteToggle}
        /> */}
        <div className="absolute flex top-1 right-1/4">
          <div
            className="bg-blue-200 rounded text-xs text-green-600 mx-2 px-2 my-0.5 cursor-pointer"
            // onClick={() => flagRef.current.flagClickHandler()}
            id="instruction"
            onClick={() => setOpenModal((prev) => !prev)}
          >
            Instructions
            <Icon
              id="question"
              name="question"
              size={10}
              className="text-green-600 mx-1 inline"
            />
          </div>
          <div
            className="rounded mx-2"
            // onClick={() => flagRef.current.flagClickHandler()}
            id="flagDiv"
            // onMouseDown={() => setStop(false)}
          >
            <Icon
              id="flag"
              name="flag"
              size={18}
              className="text-green-600 mx-2"
            />
          </div>
          <div
            id="stop"
            className=" right-1/4  top-1 w-auto h-5 bg-blue-200 rounded"
            onClick={() => stopAll()}
          >
            <Icon id="stop" name="stop" size={18} className="text-red-600 " />
          </div>
        </div>
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <Sidebar
            dragStart={(event) => onDragStart(event)}
            dragDrop={(event) => dragDrop2(event)}
            ParentIdSelector={ParentIdSelector}
            setParentIdSelector={setParentIdSelector}
            backdropList={backdropList}
            broadcastList={broadcastList}
            broadcast={broadcast}
            setBroadcast={setBroadcast}
          />{" "}
          <MidArea
            // dragDrop2={dragDrop2}
            // turn15={turn15}
            dragDrop={dragDrop}
            // dragOver={dragover_handler}
            dragStart={(event) => onDragStart(event)}
            spriteToggle={spriteToggle}
            ParentIdSelector={ParentIdSelector}
            setParentIdSelector={setParentIdSelector}
            selectedElementAttr={selectedElementAttr}
            ref={flagRef}
            backdropList={backdropList}
            backdrop={backdrop}
            setBackdrop={setBackdrop}
            broadcastList={broadcastList}
            broadcast={broadcast}
            setBroadcast={setBroadcast}
            layer={layer}
            setLayer={setLayer}
            stop={stop}
            setStop={setStop}
          />
        </div>

        <div className="w-1/3 h-auto overflow-hidden flex flex-column bg-white border-t border-l border-gray-200 rounded-tl-xl">
          <PreviewArea
            spriteToggle={spriteToggle}
            setSpriteToggle={setSpriteToggle}
            dragStart={(event) => onDragStart(event)}
            dragDrop={dragDrop}
            setLayer={setLayer}
            setStop={setStop}
          />
          <div className="w-4/12 h-1/3 text-black  absolute right-0 -bottom-5  rounded overflow-hidden border-solid border-black border-2 bg-white ">
            <SelectionArea />
          </div>
        </div>
      </div>
    </div>
  );
}
