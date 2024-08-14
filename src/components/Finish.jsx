import React from "react";

function Finish({ points, maxPoints }) {
  const percentage = (points / maxPoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints} (
        {Math.ceil(percentage)}%)
      </p>
      {/* <p className="highscore">(Highscore: {highscore} points)</p> */}
      <button
        className="btn btn-ui"
        // onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </>
  );
}

export default Finish;
