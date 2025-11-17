import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../_api";

export default function EditAuthor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function loadData() {
    try {
      const res = await API.get(`/authors/${id}`);
      setName(res.data.name);
      setEmail(res.data.email);
    } catch {
      alert("Gagal memuat data author.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await API.put(`/authors/${id}`, { name, email });
      navigate("/admin/authors");
    } catch {
      alert("Gagal update author.");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-6">
      <div className="bg-white border border-gray-200 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Author</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Nama</label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button className="text-white bg-yellow-600 hover:bg-yellow-700 font-medium rounded-lg text-sm px-4 py-2">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
