import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Detail, Edit, ErrorPage, Home, Tambah } from "./pages";

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/tambah" element={<Tambah />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
