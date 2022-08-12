import React, { useContext, useEffect } from "react";

function BlockWithDropdown({
  Id,
  FirstField,
  secondField,
  dragStart,
  color,
  list,
}) {
  //   let backdrops = ["backdrop1", "backdrop2", "backdrop3"];
  //   let backdrops = ["red", "blue", "green"];
  if (list) {
    var dropdownOptions = list.map((ele, indx) => (
      <option key={indx} value={`${ele}`} className="text-sm">
        {ele}
      </option>
    ));
  }
  return (
    <div
      draggable="true"
      id={Id}
      onDragStart={(event) => dragStart(event)}
      className={`flex flex-row flex-wrap bg-${color}-500 rounded text-white px-2 py-1 my-2 text-sm cursor-pointer  border-solid border-2 border-purple-900 inline`}
    >
      {FirstField}
      {list && (
        <select className="bg-yellow text-black rounded mx-2 inline">
          {dropdownOptions}
        </select>
      )}
      {secondField}
    </div>
  );
}

export default BlockWithDropdown;
