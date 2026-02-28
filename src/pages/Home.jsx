import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api";

export default function Home() {
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/resources`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setResources(data));
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const filtered = resources.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      {/* 🔥 Navbar */}
      <nav className="flex justify-between items-center border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold text-green-700  ">Agri Library</h1>

        <div className="flex gap-6 items-center">

          {/* Home visible to all */}
          <Link to="/home" className="hover:text-green-600">
            Home
          </Link>

          {/* Upload visible only to admin & trainer */}
          {(role === "admin" || role === "trainer") && (
            <Link to="/upload" className="hover:text-green-600">
              Upload
            </Link>
          )}

          <button
            onClick={logout}
            className="text-red-500 font-semibold"
          >
            Logout
          </button>

        </div>
      </nav>

      {/* Search */}
      <input
        type="text"
        placeholder="Search resources..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded mb-6"
      />

      {/* Resources */}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map(resource => (
          <div key={resource._id} className="border p-4 rounded shadow">
            <img
              src={resource.image || "/maize.jpg"}
              alt=""
              className="h-40 w-full object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-3">
              {resource.title}
            </h3>
            <p className="text-sm text-gray-600">
              {resource.description}
              <h1>demo</h1>
            </p>
            <a
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-3 bg-green-600 text-white px-4 py-2 rounded"
            >
              View
            </a>
          </div>
        ))}
      </div>

    </div>
  );
}