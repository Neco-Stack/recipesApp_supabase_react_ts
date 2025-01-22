import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components /Navbar";
import Footer from "./components /Footer";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import LogIn from "./components /LogIn";
import SignUp from "./components /SignUp";



const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;