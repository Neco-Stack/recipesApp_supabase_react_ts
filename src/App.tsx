import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components /Navbar";
import Footer from "./components /Footer";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;