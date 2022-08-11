import React, { useEffect, useContext } from "react";
import Icon from "./Icon";
import { Turn15ClockContext } from "../context/Turn15ClockProvider";

import { XandYValuesContext } from "../context/XandYValuesProvider";
import BlockWithInput from "../blocks/BlockWithInput";
import BlockWithDropdown from "../blocks/BlockWithDropdown";

// import Blockly from "blockly";

export default function Sidebar({
  dragDrop,
  dragStart,
  ParentIdSelector,
  setParentIdSelector,
  backdropList,
}) {
  const [x, setX, y, setY] = useContext(XandYValuesContext);

  const [turn15, setTurn] = useContext(Turn15ClockContext);

  // const [x, y] = xandYValues();

  // var toolbox = {
  //   kind: "flyoutToolbox",
  //   contents: [
  //     {
  //       kind: "block",
  //       type: "controls_if",
  //     },
  //     {
  //       kind: "block",
  //       type: "controls_repeat_ext",
  //     },
  //     {
  //       kind: "block",
  //       type: "logic_compare",
  //     },
  //     {
  //       kind: "block",
  //       type: "math_number",
  //     },
  //     {
  //       kind: "block",
  //       type: "math_arithmetic",
  //     },
  //     {
  //       kind: "block",
  //       type: "text",
  //     },
  //     {
  //       kind: "block",
  //       type: "text_print",
  //     },
  //   ],
  // };

  // useEffect(() => {
  //   var workspace2 = Blockly.inject("toolbox", { toolbox: toolbox });
  // });

  function allowDrop(ev) {
    ev.preventDefault();
  }

  return (
    <div
      id="sidebar"
      onDrop={(event) => dragDrop(event)}
      onDragOver={(event) => allowDrop(event)}
      // onDragStart={(event) => dragStart(event)}
      className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200 border-solid border-2 border-purple-900"
    >
      <div className="font-bold"> {"Events"} </div>
      <div
        draggable="true"
        id="when"
        onDragStart={(event) => dragStart(event)}
        className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer max-w-max rounded border-solid border-2 border-purple-900"
      >
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </div>
      <div
        draggable="true"
        id="this"
        onDragStart={(event) => dragStart(event)}
        // onDragOver={(event) => allowDrop(event)}
        className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer max-w-max rounded border-solid border-2 border-purple-900"
      >
        {"When this sprite clicked"}
      </div>
      <div
        draggable="true"
        id="keyPress"
        onDragStart={(event) => dragStart(event)}
        // onDragOver={(event) => allowDrop(event)}
        className="flex flex-row flex-wrap rounded bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer w-50 border-solid border-2 border-purple-900"
      >
        {"When  "}
        <select className="bg-yellow text-black rounded mx-2">
          <option value="ArrowUp">Up Arrow</option>
          <option value="ArrowDown">Down Arrow</option>
          <option value="ArrowLeft">Left Arrow</option>
          <option value="ArrowRight">Right Arrow</option>
        </select>
        {"Key pressed"}
      </div>
      <BlockWithDropdown
        Id="WhenBackdropSwitchesTo"
        FirstField="When backdrop switches to"
        dragStart={dragStart}
        color={"yellow"}
        list={backdropList}
      ></BlockWithDropdown>
      <div className="font-bold ">
        {" "}
        {/* */} {"Motion"}{" "}
      </div>

      <div
        draggable="true"
        id="move10"
        onDragStart={(event) => dragStart(event)}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer max-w-max rounded border-solid border-2 border-purple-900"
      >
        {"Move 10 steps"}
      </div>
      <div
        draggable="true"
        id="turn15deganticlock"
        onDragStart={(event) => dragStart(event)}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer max-w-max rounded border-solid border-2 border-purple-900"
      >
        {"Turn "}
        <Icon name="undo" size={15} className="text-white mx-2" />
        {"15 degrees"}
      </div>
      <div
        draggable="true"
        id="turn15degclock"
        onDragStart={(event) => dragStart(event)}
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer max-w-max rounded border-solid border-2 border-purple-900"
      >
        {"Turn "}
        <Icon name="redo" size={15} className="text-white mx-2" />
        {"15 degrees"}
      </div>
      <BlockWithInput
        Id="moveToRandomPos"
        FirstField="Move to random position "
        dragStart={dragStart}
        color="blue"
      ></BlockWithInput>
      <BlockWithInput
        Id="goto"
        FirstField="Go to X:  "
        InputId="gotoX"
        value={x}
        SecondField={" Y: "}
        InputIdTwo={"gotoY"}
        valueTwo={y}
        dragStart={dragStart}
        color="blue"
      ></BlockWithInput>
      <BlockWithInput
        Id="glide"
        FirstField="glide "
        InputId="secs"
        value={3}
        SecondField={" secs to random position"}
        dragStart={dragStart}
        color="blue"
      ></BlockWithInput>
      <BlockWithInput
        Id="glidetoXY"
        FirstField="glide "
        InputId="secsforXY"
        value={3}
        SecondField={"secs to X: "}
        InputIdTwo={"glideX"}
        valueTwo={x}
        ThirdField={" Y: "}
        InputId3={"glideY"}
        valueThree={y}
        dragStart={dragStart}
        color="blue"
      ></BlockWithInput>
      <BlockWithInput
        Id="pointToAngle"
        FirstField="Point in direction"
        InputId="pointToAngleInput"
        value={turn15}
        dragStart={dragStart}
        color="blue"
      ></BlockWithInput>
      <BlockWithInput
        Id="changeXby"
        FirstField="Change X by"
        InputId="Xby"
        value={x}
        dragStart={dragStart}
        color="blue"
      ></BlockWithInput>
      <BlockWithInput
        Id="setXTo"
        FirstField="set X To:"
        InputId="setXToValue"
        value={x}
        dragStart={dragStart}
        color="blue"
      ></BlockWithInput>
      <BlockWithInput
        Id="changeYby"
        FirstField="Change Y by"
        InputId="Yby"
        value={y}
        dragStart={dragStart}
        color="blue"
      ></BlockWithInput>
      <BlockWithInput
        Id="setYTo"
        FirstField="set Y To:"
        InputId="setYToValue"
        value={y}
        dragStart={dragStart}
        color="blue"
      ></BlockWithInput>
      <BlockWithInput
        Id="edgeBounce"
        FirstField="if on edge bounce"
        dragStart={dragStart}
        color="blue"
      ></BlockWithInput>
      {/* </div> */}

      <div className="font-bold"> {"Looks"}</div>

      <BlockWithInput
        Id="sayHelloWithSecs"
        FirstField="say"
        InputId="sayHelloInput1"
        value="Hello"
        SecondField="for"
        InputIdTwo="sayHellosecs"
        valueTwo={3}
        ThirdField="seconds"
        // value={y}
        dragStart={dragStart}
        color="pink"
      ></BlockWithInput>
      <BlockWithInput
        Id="sayHello"
        FirstField="say"
        InputId="sayHelloOnlyInput1"
        value="Hi!"
        dragStart={dragStart}
        color="pink"
      ></BlockWithInput>
      <BlockWithInput
        Id="changeSizeBy"
        FirstField="change size by"
        InputId="changeSizeByInput"
        value={10}
        dragStart={dragStart}
        color="pink"
      ></BlockWithInput>
      <BlockWithInput
        Id="setSizeTo"
        FirstField="set size to"
        InputId="setSizeToInput"
        value={10}
        SecondField="%"
        dragStart={dragStart}
        color="pink"
      ></BlockWithInput>
      <BlockWithInput
        Id="changeColorEffectBy"
        FirstField="change color effect by 25"
        dragStart={dragStart}
        color="pink"
      ></BlockWithInput>
      <BlockWithInput
        Id="setColorEffectTo"
        FirstField="set color effect to 0"
        dragStart={dragStart}
        color="pink"
      ></BlockWithInput>
      <BlockWithDropdown
        Id="backdropSwitch"
        FirstField="set backdrop to"
        dragStart={dragStart}
        color={"pink"}
        list={backdropList}
      ></BlockWithDropdown>
      <BlockWithDropdown
        Id="backdropNext"
        FirstField="Next backdrop"
        dragStart={dragStart}
        color={"pink"}
      ></BlockWithDropdown>
      <BlockWithInput
        Id="show"
        FirstField="Show"
        dragStart={dragStart}
        color="pink"
      ></BlockWithInput>
      <BlockWithInput
        Id="hide"
        FirstField="Hide"
        dragStart={dragStart}
        color="pink"
      ></BlockWithInput>
      {/* </div> */}
      <div className="font-bold"> {"Control"} </div>
      <BlockWithInput
        Id="waitForSec"
        FirstField="Wait for "
        InputId="waitInput"
        value={10}
        SecondField="seconds before moving to random position"
        dragStart={dragStart}
        color="green"
      ></BlockWithInput>
      <BlockWithInput
        Id="repeat"
        FirstField="repeat "
        InputId="repeatInput"
        value={10}
        SecondField=" random position"
        dragStart={dragStart}
        color="green"
      ></BlockWithInput>
      <BlockWithInput
        Id="forever"
        FirstField="forever "
        SecondField="move to random position"
        dragStart={dragStart}
        color="green"
      ></BlockWithInput>
      <BlockWithInput
        Id="ifElse"
        FirstField="If Angle is below 90 degree then rotate 15 deg clockwise else move to random angle "
        dragStart={dragStart}
        color="green"
      ></BlockWithInput>
      <BlockWithInput
        Id="createClone"
        FirstField="Create own clone"
        dragStart={dragStart}
        color="green"
      ></BlockWithInput>
      {/* <BlockWithInput
          Id="reset"
          FirstField="Reset"
          dragStart={dragStart}
          color="green"
        ></BlockWithInput> */}
      {/* </div> */}
      {/* Blockly library */}
      {/* <div id="toolbox" style={{ height: "200px", width: "200px" }}></div> */}
    </div>
  );
}
