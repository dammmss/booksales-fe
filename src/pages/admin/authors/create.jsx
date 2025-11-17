import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../_api";

export default function CreateAuthor() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Nama wajib diisi.");
      return;
    }

    try {
      await API.post("/authors", { name, email });
      navigate("/admin/authors");
    } catch {
      setError("Gagal menambah author.");
    }
  }

  return (
    <div className="p-6">
      <div className="bg-white border border-gray-200 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Tambah Author</h2>

        {error && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Nama</label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
              placeholder="Masukkan nama..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Email (opsional)</label>
            <input
              type="email"
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
              placeholder="contoh@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}
