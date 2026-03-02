import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api/resources";

export default function Upload() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    category: "Crops",
    type: "PDF",
    url: "",
    description: ""
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login first");
      navigate("/");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("title", formData.title);
      data.append("category", formData.category);
      data.append("type", formData.type);
      data.append("url", formData.url);
      data.append("description", formData.description);

      if (image) {
        data.append("image", image);
      }

      const res = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
          // USIWEKE Content-Type ukiwa unatumia FormData
        },
        body: data
      });

      // 👇 Soma kwanza kama text ili kuepuka JSON crash
      const text = await res.text();

      let result;
      try {
        result = JSON.parse(text);
      } catch (err) {
        console.error("Server returned HTML instead of JSON:");
        console.log(text);
        throw new Error("Server error: Check backend route or server.");
      }

      if (!res.ok) {
        throw new Error(result.message || "Upload failed");
      }

      alert("Resource uploaded successfully ✅");

      // Reset form
      setFormData({
        title: "",
        category: "Crops",
        type: "PDF",
        url: "",
        description: ""
      });
      setImage(null);

      navigate("/home");

    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8">

        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
          Upload Resource
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <input
            name="title"
            value={formData.title}
            placeholder="Resource Title"
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-400"
          />

          {/* Category & Type */}
          <div className="grid grid-cols-2 gap-4">

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="p-3 border rounded-lg"
            >
              <option>Crops</option>
              <option>Livestock</option>
              <option>Fisheries</option>
            </select>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="p-3 border rounded-lg"
            >
              <option>PDF</option>
              <option>Video</option>
              <option>Article</option>
              <option>Research</option>
            </select>

          </div>

          {/* URL */}
          <input
            name="url"
            value={formData.url}
            placeholder="Resource URL"
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />

          {/* Image */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border rounded-lg"
          />

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            placeholder="Description"
            rows="4"
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-lg transition disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Submit Resource"}
          </button>

        </form>
      </div>
    </div>
  );
}