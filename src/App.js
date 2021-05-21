import React, { useState } from "react";
import SingleColor from "./SingleColor";

import Values from "values.js";

function App() {
  // set state value for colors, set to an empty string by default...
  const [color, setColor] = useState("");
  // set state for the error on the input field, if no valid value is typed in...false by default....
  const [error, setError] = useState(false);
  // set state for the color list, set to an orange color with 10 tints(light) and 10 shades(dark) by default (100% divided by 10)...
  const [list, setList] = useState(new Values("#f15025").all(10));

  // set up handleSubmit function that listens for the event object(e)...
  // preventDefault prevents unneccesary page reload...
  const handleSubmit = (e) => {
    e.preventDefault();
    // we want to check if the user inputs a real color...
    // use the try/catch method (i.e "try" to set up the color values, if it doesn't work, "catch" the mistake with an error...)
    try {
      let colors = new Values(color).all(10);
      // this updates the state value for "list" with the specified colors
      setList(colors);
    } catch (error) {
      // if there is an error , change the state value of "error" to TRUE...
      setError(true);
    }
  };

  return (
    <>
      <section className="container">
        <h3>color generator</h3>
        <form onSubmit={handleSubmit}>
          {/* value will be equal to the state value of "color"... */}
          <input
            type="text"
            value={color}
            // onChange listens for the event object (e) and sets the color to the target color...
            onChange={(e) => setColor(e.target.value)}
            // set up a default color in the input field...
            placeholder="#f15025"
            // this sets up the red error border in the input field if no valid value is given...
            // use template string... IF there is an error, THEN change the className to "error", IF NOT, don't add the className....
            className={`${error ? "error" : null}`}
          />
          <button className="btn" type="submit">
            submit
          </button>
        </form>
      </section>
      <section className="colors">
        {/* map over the color list to get the individual color and index*/}
        {/* for each item, return a SingleColor component 
        // the object spread operator (...) gets all of the properties for the individual item...*/}
        {/* pass in the "index" prop to use in SingleColor.js */}
        {list.map((color, index) => {
          return (
            <SingleColor
              key={index}
              {...color}
              index={index}
              hexColor={color.hex}
            />
          );
        })}
      </section>
    </>
  );
}

export default App;
