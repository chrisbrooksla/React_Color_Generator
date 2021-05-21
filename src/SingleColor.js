import React, { useState, useEffect } from "react";
import rgbToHex from "./utils";

// the props "weight"  and "hexColor"  are coming from the individual item from the color list, "index" is the prop we made in App.js...
const SingleColor = ({ rgb, weight, index, hexColor }) => {
  // set up the state value for alert, default will be FALSE..
  const [alert, setAlert] = useState(false);

  // we need to convert the RGB (an array at the moment) values into a string,and join it with commas
  // (every iem will be seperated by the comma)...
  // let's just call this "bcg"...
  const bcg = rgb.join(",");

  const hex = rgbToHex(...rgb);

  // this is so we see the "#" before the hex color...
  const hexValue = `#${hexColor}`;

  // this sets up functionality to clear the "copied to clipboard" alert after 3 seconds(sets state value of alert back to FALSE)..
  useEffect(() =>{
    const timeout = setTimeout(() =>{
      setAlert(false)
    }, 3000)
    return ()=> clearTimeout(timeout)
  },[alert])


  return (
    // set up color as a template string, also add inline style ({{}} are needed because we are reverting back to javaScript)
    // we say "IF the index of the item is greater than 10, THEN change the className to "color-light"
    // this makes it so we can read the info on the darker colors...
    // we want to access the "bcg" value (the string from the array), and pass it into the rgb function...
    // this makes sure that each individual square has it's own unique color...
    <article
      className={`color ${index > 10 && "color-light"}`}
      style={{ backgroundColor: `rgb(${bcg})` }}

      /* this sets up a functionality, where if you click an individual square, it copies the hexValue to the clipboard */
      /* it changes the state value of "alert" to true, which triggers the message "copied to clipboard" */
      onClick =
      {() => {
        setAlert(true);
        navigator.clipboard.writeText(hexValue);
      }}
    >
    
      
      <p className="percent-value">{weight}%</p>
      <p className="color-value">{hexValue}</p>
      {/* this says if the alert state value is TRUE , THEN we want to display a paragraph with a message...*/}
      {alert && <p className="alert">copied to clipboard</p>}
    </article>
  );
};

export default SingleColor;
