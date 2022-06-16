import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GetData from "./component/GetData";
import { Detail, Edit, ErrorPage, Home, Tambah } from "./pages";

function App() {
  const [data, setData] = useState([]);
  return (
    <>
      <Router>
        <div className="App">
          <GetData  setData={setData} />
          <Routes>
            <Route path="/" element={<Home data={data} />} />
            <Route path="/detail/:id" element={<Detail data={data} />} />
            <Route path="/edit/:id" element={<Edit data={data} />} />
            <Route path="/tambah" element={<Tambah/>} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
