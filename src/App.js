import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/signup";
import LoginForm from "./components/login";
import MovieList from "./components/movieslist";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/loginform" element={<LoginForm />}></Route>
        <Route path="/movieslist" element={<MovieList />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
