import React from "react";

function Question({ question, dispatch, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, i) => (
          <Option
            correct={question.correctOption}
            question={question}
            answer={answer}
            index={i}
            dispatch={dispatch}
            option={option}
            key={option}
          />
        ))}
      </div>
    </div>
  );
}

function Option({ option, dispatch, index, answer, question }) {
  const isAnswered = answer != null;
  return (
    <button
      onClick={() => dispatch({ name: "newAnswer", payload: index })}
      className={`btn btn-option
        ${answer == index ? "answer" : ""}
        ${
          isAnswered
            ? index == question.correctOption
              ? "correct"
              : "wrong"
            : ""
        }`}
      disabled={isAnswered}
    >
      {option}
    </button>
  );
}

export default Question;
