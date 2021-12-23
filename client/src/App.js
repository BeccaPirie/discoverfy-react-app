import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Home from "./pages/Home";

const code = new URLSearchParams(window.location.search).get("code")

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={code ? <Home code={code} /> : <Login/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
