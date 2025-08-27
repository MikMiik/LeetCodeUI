import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Problem from "./pages/Problem";
import ProblemDetail from "./pages/ProblemDetail";
import { ROUTES } from "./configs/routes";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.PROBLEMS} element={<Problem />} />
      <Route path={ROUTES.PROBLEM_DETAIL} element={<ProblemDetail />} />
    </Routes>
  );
}

export default App;
