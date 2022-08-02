import React from "react";

function BlockWithInput({
  Id,
  FirstField,
  InputId,
  value,
  dragStart,
  SecondField,
  InputIdTwo,
  valueTwo,
  ThirdField,
  InputId3,
  valueThree,
  color,
}) {
  return (
    <div
      draggable="true"
      id={Id}
      onDragStart={(event) => dragStart(event)}
      className={`flex flex-row flex-wrap bg-${color}-500 rounded text-white px-2 py-1 my-2 text-sm cursor-pointer`}
    >
      {FirstField}
      {InputId && (
        <input
          id={InputId}
          value={value}
          className="w-8 mx-2 rounded overflow-none text-black text-center text-sm"
        ></input>
      )}
      {SecondField}

      {InputIdTwo && (
        <input
          id={InputIdTwo}
          value={valueTwo}
          className="w-8 mx-2 rounded overflow-none text-black text-center text-sm"
        ></input>
      )}

      {ThirdField}
      {InputId3 && (
        <input
          id={InputId3}
          value={valueThree}
          className="w-8 mx-2 rounded overflow-none text-black text-center text-sm"
        ></input>
      )}
    </div>
  );
}

export default BlockWithInput;
