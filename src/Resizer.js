import React from "react";
import ReactDOM from "react-dom";

function Resizer() {
  let _width = window.innerWidth;
  let _height = window.innerHeight;
  let theWidth, theHeight;
  const aspectratio = 16/9;

  if(_width /  aspectratio < _height) {
    theWidth = _width;
    theHeight = theWidth / aspectratio;
  } else {
    theHeight = _height;
    theWidth = theHeight * aspectratio;
  }
  const [dimensions, setDimensions] = React.useState({
    height: theHeight+"px",
    width: theWidth+"px"
  });
  React.useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
      _width = window.innerWidth;
      _height = window.innerHeight;
      if(_width /  aspectratio < _height) {
        theWidth = _width;
        theHeight = theWidth / aspectratio;
      } else {
        theHeight = _height;
        theWidth = theHeight * aspectratio;
      }
      setDimensions({
        height: theHeight,
        width: theWidth
      });
    }, 300);

    window.addEventListener("resize", debouncedHandleResize);

    return _ => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });
  return (
    <div >
      Rendered at {dimensions.width} x {dimensions.height}
    </div>
  );
}

function debounce(fn, ms) {
  let timer;
  return _ => {
    clearTimeout(timer);
    timer = setTimeout(_ => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

export default Resizer;
