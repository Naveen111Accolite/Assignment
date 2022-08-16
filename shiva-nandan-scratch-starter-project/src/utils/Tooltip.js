export default function tooltipFunc(value, timeInSecs) {
  //remove tooltip if already exists from other events
  var tooltip = document.getElementById("tooltip");
  if (tooltip) tooltip.remove();

  //function to create div with tooltip id for Tooltip CSS properties
  function createDiv(val) {
    let sprite = document.querySelector("#sprite ");
    let div1 = document.createElement("div");
    div1.innerHTML = val;
    div1.setAttribute("id", "tooltip");
    sprite.appendChild(div1);
  }

  createDiv(value);

  //show tooltip with respect to it's position
  function showTooltip() {
    // var mysprite = document.getElementById("mysprite");
    var mysprite = document.querySelector("#sprite .SelectedSVGEle");
    var tooltip = document.getElementById("tooltip");

    var iconPos = mysprite.getBoundingClientRect();
    if (tooltip?.style) {
      tooltip.style.left = iconPos.right - 10 + "px";
      tooltip.style.top = window.scrollY + iconPos.top - 20 + "px";
      tooltip.style.display = "block";
    }
    // console.log("iconPos", iconPos);
  }
  showTooltip();

  const setTimeoutPromise = () => {
    if (timeInSecs) {
      setTimeout(() => {
        let tooltip = document.querySelector("#sprite #tooltip");
        if (tooltip) {
          tooltip.style.display = "none";
        }
      }, timeInSecs * 1000);
    }
  };
  setTimeoutPromise();
}
