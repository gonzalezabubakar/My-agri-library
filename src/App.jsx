import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Users from "./pages/Users";

function App() {
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        {role !== "user" && <Route path="/upload" element={<Upload />} />}
        {role === "admin" && <Route path="/users" element={<Users />} />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;