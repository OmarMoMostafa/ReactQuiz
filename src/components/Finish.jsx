import React from "react";

function Finish({ points, maxPoints, dispatch }) {
  const percentage = (points / maxPoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints} (
        {Math.ceil(percentage)}%)
      </p>
      {/* TODO: add high score functionality */}
      {/* <p className="highscore">(Highscore: {highscore} points)</p> */}
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ name: "restart" })}
      >
        Restart quiz
      </button>
    </>
  );
}

export default Finish;
