import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import ToggleSprite from "./components/ToggleSprite";

export default function App() {
  const [spriteToggle, setSpriteToggle] = useState(true);
  const [ParentIdSelector, setParentIdSelector] = useState();
  const [selectedElementAttr, setSelectedElementAttr] = useState();

  function dragDrop2(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text").split(",");

    document.querySelector(`#midarea #${data[0]}`).remove();
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
        console.log(
          "ev.target.parentNode.id",
          e.target.parentNode.id,
          targetEle.getAttribute("data-ts")
        );
      });
    }

    // return () => {
    //   sidebar.removeEventListener("mousedown", (e) => {
    //     setParentIdSelector(ev.target.parentNode.id);
    //   });
    // };
  });

  let onDragStart = function (ev) {
    // ev.preventDefault();
    let targetElement = ev.target;
    const rect = ev.target.getBoundingClientRect();

    if (ParentIdSelector == "midarea") {
      let timestamp = targetElement.getAttribute("data-ts");
      let myData = targetElement.id + "," + timestamp;
      ev.dataTransfer.setData("text", myData);

      targetElement.setAttribute("data-ts", timestamp);
      // setParentIdSelector(ev.target.parentNode.id);
      console.log("myData", myData);
      return;
    }
    let timestamp = Date.now();

    let myData = targetElement.id + "," + timestamp;
    console.log("drag-data", myData);
    ev.dataTransfer.setData("text", myData);
    targetElement.setAttribute("data-ts", timestamp);
    setParentIdSelector(ev.target.parentNode.id);
  };

  useEffect(() => {
    let parentElements = document.querySelectorAll("#Parent");
    console.log("parentElements", parentElements);
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
    // let eleSelected = document.querySelector(`#midarea #${data[0]}`);
    let eleSelected = document.querySelector(`#midarea [data-ts="${data[1]}"]`);
    // ||
    // document.querySelector(`#midarea [data-parent-ts="${data[1]}"]`);
    var rect = e.target.getBoundingClientRect();
    const coordinates = [e.pageX - rect.left, e.pageY - rect.top];

    console.log(
      "eleSelected",
      eleSelected,
      // document.getAttribute("data-parent-ts"),
      e.currentTarget.getAttribute("data-parent-ts")
    );

    if (ParentIdSelector == "midarea" || ParentIdSelector == "Parent") {
      // e.target.appendChild(document.querySelector(`#midarea #${data}`));
      // ev.target.appendChild(document.getElementById(data));
      if (eleSelected) {
        if (ParentIdSelector == "Parent") {
          eleSelected.style.left = e.clientX - 240 + "px";
          eleSelected.style.top = e.clientY + "px";
          document.getElementById("midarea").appendChild(eleSelected);
          console.log("parentselecttttt");
        }
        if (ParentIdSelector == "Parent" && e.target.id == "midarea") {
          console.log(
            "parent and midareassssss",
            eleSelected.offsetWidth,
            eleSelected.offsetHeight
          );
        }
        // eleSelected.style.position = "absolute";
        // eleSelected.style.left = coordinates[0] + 240 + "px";
        // eleSelected.style.top = coordinates[1] + "px";
        if (ParentIdSelector == "midarea" && e.target.id == "midarea") {
          eleSelected.style.position = "absolute";

          eleSelected.style.left =
            e.clientX - eleSelected.offsetWidth / 2 + "px";
          eleSelected.style.top =
            e.clientY - eleSelected.offsetHeight / 2 + "px";
        }
      }
    } else {
      console.log("e.target.id-else", e.target.id);
      if (
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
        clone.style.top = e.clientY - clone.offsetHeight / 2 + "px";
        console.log(clone, clone.offsetWidth, "clone");
        e.target.appendChild(clone);
      }
    }

    let parentNode = document.getElementById("Parent");

    if (parentNode) {
      console.log("parentnode", parentNode, parentNode.childNodes.length);
      if (parentNode.childNodes.length == 0) {
        parentNode.remove();
        console.log("No children");
      }
    }

    console.log("e.target.id", e.target.id);

    if (e.target.id != "midarea") {
      // alert("hello");
      const targetEle = document.querySelector(`#midarea #${e.target.id}`);
      // const droppedEle = document.getElementById(data[0]).cloneNode(true);
      if (ParentIdSelector == "midarea") {
        var droppedEle = document.querySelector(
          `#midarea [data-ts="${data[1]}"]`
        );
        console.log("dropped midarea");
      } else if (
        ParentIdSelector == "Parent" &&
        e.target.parentNode.id == "Parent"
      ) {
        var droppedEle = document.querySelector(`[data-ts="${data[1]}"]`);
        console.log("both parettttt");
      } else {
        var droppedEle = document
          .querySelector(`[data-ts="${data[1]}"]`)
          .cloneNode(true);
        console.log("dropped midarea nottt cloneee");
      }

      function snapElements() {
        const createEle = document.createElement("div");
        // createEle.classList.add("Parent");
        let timestampParent = Date.now();
        createEle.setAttribute("id", "Parent");
        createEle.setAttribute("data-parent-ts", timestampParent);
        createEle.style.position = "absolute";
        createEle.style.left = e.clientX - createEle?.offsetWidth + "px";
        createEle.style.top = e.clientY - createEle?.offsetHeight + "px";
        midarea.appendChild(createEle);
        createEle.appendChild(targetEle);
        // console.log(
        //   "snapelement",
        //   e.clientX,
        //   createEle?.offsetWidth,
        //   // e.offsetY,
        //   createEle?.offsetHeight,
        //   e.clientX - createEle?.offsetWidth,
        //   e.clientY - createEle?.offsetHeight
        // );
      }
      // droppedEle.style.position = "absolute";

      if (!(e.target.parentNode.id == "Parent" || e.target.id == "Parent")) {
        snapElements();
      }

      targetEle.style.position = "relative";
      targetEle.style.left = "0px";
      targetEle.style.top = "0px";
      targetEle.style.margin = "0px 0px";
      // targetEle.style.position = "relative";
      droppedEle.style.position = "relative";
      droppedEle.style.left = "0px";

      droppedEle.style.top = "0px";
      droppedEle.style.margin = "0px 0px";

      targetEle.after(droppedEle);
    }
  }

  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row  ">
        <ToggleSprite
          spriteToggle={spriteToggle}
          setSpriteToggle={setSpriteToggle}
        />
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
          <Sidebar
            dragStart={(event) => onDragStart(event)}
            dragDrop={(event) => dragDrop2(event)}
            ParentIdSelector={ParentIdSelector}
            setParentIdSelector={setParentIdSelector}
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
          />
        </div>

        <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <PreviewArea
            spriteToggle={spriteToggle}
            setSpriteToggle={setSpriteToggle}
            dragStart={(event) => onDragStart(event)}
          />
        </div>
      </div>
    </div>
  );
}
