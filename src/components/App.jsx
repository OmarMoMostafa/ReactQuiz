import { useEffect, useReducer } from "react";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Loader from "./Loader.jsx";
import Error from "./Error.jsx";
import Start from "./Start.jsx";
import Question from "./Question.jsx";
import NextBtn from "./NextBtn.jsx";
import Progress from "./Progress.jsx";
import Finish from "./Finish.jsx";

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  switch (action.name) {
    case "loading":
      return { ...state, status: "loading" };
    case "dataFetched":
      return { ...state, status: "ready", questions: action.payload };
    case "error":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions[state.index];
      const isCorrect = question.correctOption == action.payload;
      const newPoints = isCorrect
        ? state.points + question.points
        : state.points;
      return { ...state, answer: action.payload, points: newPoints };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return { ...state, status: "finished" };

    default:
      return state;
  }
}

function App() {
  const [{ questions, status, answer, points, index }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((acc, curr) => curr.points + acc, 0);

  useEffect(() => {
    dispatch({ name: "loading" });
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ name: "dataFetched", payload: data }))
      .catch((err) => dispatch({ name: "error" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Start numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              points={points}
              maxPoints={maxPoints}
              index={index}
              numQuestions={numQuestions}
              answer={answer}
            />
            <Question
              dispatch={dispatch}
              answer={answer}
              question={questions[index]}
            />
            <NextBtn
              dispatch={dispatch}
              answer={answer}
              numQuestions={numQuestions}
              index={index}
            />
          </>
        )}
        {status === "finished" && (
          <Finish points={points} maxPoints={maxPoints} />
        )}
      </Main>
    </div>
  );
}

export default App;
