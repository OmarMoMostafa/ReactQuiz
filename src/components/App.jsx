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
import Footer from "./Footer.jsx";
import Timer from "./Timer.jsx";

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  // TODO: permit navigation backward
  index: 0,
  // TODO: use array to permit changing answer
  answer: null,
  points: 0,
  secondsRemaining: null,
  // TODO: add high score property and save it in local storage
};

const SECS_PER_QUESTION = 10;

function reducer(state, action) {
  switch (action.name) {
    case "loading":
      return { ...state, status: "loading" };
    case "dataFetched":
      return { ...state, status: "ready", questions: action.payload };
    case "error":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
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
    case "restart":
      return { ...initialState, status: "ready", questions: state.questions };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      return state;
  }
}

function App() {
  const [
    { questions, status, answer, secondsRemaining, points, index },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((acc, curr) => curr.points + acc, 0);

  // "http://localhost:8000/questions"
  useEffect(() => {
    dispatch({ name: "loading" });
    fetch("https://api.jsonbin.io/v3/b/66d47506acd3cb34a87cc64d")
      .then((res) => res.json())
      .then((data) =>
        dispatch({ name: "dataFetched", payload: data.record.questions })
      )
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
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextBtn
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <Finish points={points} maxPoints={maxPoints} dispatch={dispatch} />
        )}
      </Main>
    </div>
  );
}

export default App;
