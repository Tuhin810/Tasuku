import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screen/home/Home";
import VideoDetails from "./screen/videoDetails/VideoDetails";
import Navbar from "./components/shared/navbar/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:id" element={<VideoDetails />} />{" "}
      </Routes>
    </Router>
  );
};

export default App;
