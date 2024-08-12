import React from "react";

function Start({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ name: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default Start;
