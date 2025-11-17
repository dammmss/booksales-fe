import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../_api";

export default function EditGenre() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function loadData() {
    try {
      const res = await API.get(`/genres/${id}`);
      setName(res.data.name);
    } catch {
      setError("Gagal memuat data genre.");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await API.put(`/genres/${id}`, { name });
      navigate("/admin/genres");
    } catch {
      setError("Gagal update genre.");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="p-6">
      <div className="bg-white border border-gray-200 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Genre</h2>

        {error && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded bg-red-50">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Nama Genre</label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
