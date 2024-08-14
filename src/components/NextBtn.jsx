import React from "react";

function NextBtn({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return null;
  if (index < numQuestions - 1)
    return (
      <button
        onClick={() => dispatch({ name: "nextQuestion" })}
        className="btn"
      >
        Next
      </button>
    );
  if (index == numQuestions - 1)
    return (
      <button onClick={() => dispatch({ name: "finish" })} className="btn">
        Finish
      </button>
    );
}

export default NextBtn;
