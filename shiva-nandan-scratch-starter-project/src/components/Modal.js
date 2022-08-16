import React, { useEffect } from "react";
import snapElements from "../Instructions/snapele.png";
import Icon from "./Icon";

function Modal({ setOpenModal }) {
  let InstructionsWithImg = [
    {
      message1:
        "Drag any block from sidearea and drop into middle area like scratch.",
      //   img: "../Instructions/step1.png",
    },
    {
      message:
        "Drag222 any block from sidearea and drop into middle area like scratch.",
      //   img: "../Instructions/step2.png",
    },
  ];

  //   const images = [
  //     require("../Instructions/step1.png"),
  //     require("../Instructions/step2.png"),
  //     require("../Instructions/step3.png"),
  //   ];

  //   let imgdata = images.map((ele, indx) => {
  //     <img key={indx} src={images[ele]} className="h-40 w-auto m-auto" />;
  //     {
  //       console.log("images[ele]", images[ele], ele);
  //     }
  //   });

  //   <img src={images[ele]} />

  //   useEffect(() => {
  //     let data = InstructionsWithImg.map((ele, indx) => (
  //       <div key={ele.message}>
  //         {ele.message}
  //         <img
  //           src={require(`../Instructions/step${indx + 1}.png`)}
  //           alt="image"
  //           className="h-40 w-full"
  //         />
  //       </div>
  //     ));

  //     return () => {};
  //   }, []);

  return (
    <>
      <div className="absolute w-full h-full bg-gray-50 opacity-50 z-30"></div>
      <div className="absolute left-52 top-20 h-96 w-1/2  rounded   border-solid border-black border-2 z-40">
        <div onClick={() => setOpenModal(false)}>
          <Icon
            id="window-close"
            name="window-close"
            size={30}
            className="text-black absolute right-5 top-3"
          />
        </div>
        <div className=" top-0 h-1/6 bg-green-400 rounded text-sm p-5 overflow-auto text-center ">
          Scratch clone - Tutorials
          <Icon
            id="lightbulb"
            name="lightbulb"
            size={20}
            className="text-white  inline "
          />
        </div>
        <div className=" h-5/6 bottom-0  overflow-auto text-black p-1  bg-white mb-5 flex flex-col text-center snap-y snap-mandatory">
          {/* <imp src={snapElements} alt="image" /> */}
          {/* {imgdata} */}
          <div className="h-full bg-green-100 my-5 rounded snap-start border-solid border-teal-400 border-2">
            <div className="py-2 font-serif font-semibold text-sm">
              Drag any block from sidearea and drop into middle area similar to
              scratch.
            </div>
            <img
              src={require("../Instructions/step1.png")}
              alt="image"
              className="h-40 w-96 m-auto"
            />
          </div>
          <div className="h-full bg-green-100 border-solid border-teal-400 border-2 my-5 rounded snap-start ">
            <div className="py-2 font-serif font-semibold text-sm">
              To make group of elements (snapping), drag and drop over another
              block as shown below
            </div>
            <div className="flex">
              <img
                src={require("../Instructions/step2.png")}
                alt="image"
                className="h-40 w-96 m-auto"
              />
              <img
                src={require("../Instructions/step3.png")}
                alt="image"
                className="h-40 w-96 m-auto"
              />
            </div>
          </div>
          {/* <div className="h-full bg-green-100 border-solid border-teal-400 border-2 my-5 rounded snap-start ">
          <div className="py-2 font-serif font-semibold text-sm">
            Once you drop dragged block, the dropped block will snap below the
            target block. (Note: Events blocks will go at top)
          </div>
          <img
            src={require("../Instructions/step3.png")}
            alt="image"
            className="h-40 w-96 m-auto"
          />
        </div> */}
          <div className="h-full bg-green-100 border-solid border-teal-400 border-2 my-5 rounded snap-start ">
            <div className="py-2 font-serif font-semibold text-sm">
              Add block anywhere by dragging and dropping over another block.
            </div>
            <div className="flex">
              <img
                src={require("../Instructions/step4.png")}
                alt="image"
                className="h-40 w-96 m-auto"
              />
              <img
                src={require("../Instructions/step5.png")}
                alt="image"
                className="h-40 w-96 m-auto"
              />
            </div>
          </div>
          {/* <div className="h-full bg-green-100 border-solid border-teal-400 border-2 my-5 rounded snap-start ">
          <div className="py-2 font-serif font-semibold text-sm">
            Below image shows the set of blocks in parent container. And to run
            the set of blocks you can either click on it or click on respective
            Events (Here we can click "flag" to execute it)
          </div>
          <img
            src={require("../Instructions/step5.png")}
            alt="image"
            className="h-40 w-96 m-auto"
          />
        </div> */}
          <div className="h-full bg-green-100 border-solid border-teal-400 border-2 my-5 rounded snap-start ">
            <div className="py-2 font-serif font-semibold text-sm">
              To drag - you can do it by dragging grey area and drop it anywhere
              in midarea.(Note: Dropping it to Sidearea will delete the
              container)
            </div>
            <div className="flex">
              <img
                src={require("../Instructions/step9.png")}
                alt="image"
                className="h-40 w-72 m-auto"
              />
              <img
                src={require("../Instructions/step10.png")}
                alt="image"
                className="h-40 w-72 m-auto"
              />
            </div>
          </div>
        </div>

        {/* <div className="h-10 bg-green-100 border-solid border-teal-400 border-2 w-full rounded ">Footer</div> */}
      </div>
    </>
  );
}

export default Modal;
