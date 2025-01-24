import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components /Navbar";
import Footer from "./components /Footer";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import LogIn from "./components /LogIn";
import SignUp from "./components /SignUp";
import Profile from "./pages/Profile";
import PasswordForgotten from "./components /PasswordForgotten";


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
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<PasswordForgotten />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
