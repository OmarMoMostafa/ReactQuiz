import React from "react";

function NextBtn({ dispatch, answer }) {
  if (answer === null) return null;
  return (
    <button onClick={() => dispatch({ name: "nextQuestion" })} className="btn">
      Next
    </button>
  );
}

export default NextBtn;
