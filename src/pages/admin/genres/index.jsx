import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../../_api";

export default function AdminGenres() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const res = await API.get("/genres");
      setGenres(res.data.data);
    } catch (err) {
      console.error("Gagal memuat genre:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Yakin ingin menghapus genre ini?")) return;

    try {
      await API.delete(`/genres/${id}`);
      loadData();
      alert("Genre berhasil dihapus!");
    } catch (err) {
      alert("Gagal menghapus genre.");
    }
  }

  return (
    <div className="p-6">
      <div className="bg-white border border-gray-200 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Data Genre</h2>

          <Link
            to="/admin/genres/create"
            className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
          >
            Tambah Genre
          </Link>
        </div>

        {loading ? (
          <p>Memuat...</p>
        ) : (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">Nama Genre</th>
                  <th className="px-6 py-3">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {genres.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-3 text-center">
                      Belum ada data.
                    </td>
                  </tr>
                ) : (
                  genres.map((g, i) => (
                    <tr key={g.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-3">{i + 1}</td>
                      <td className="px-6 py-3">{g.name}</td>

                      <td className="px-6 py-3 flex gap-2">
                        <button
                          onClick={() => navigate(`/admin/genres/edit/${g.id}`)}
                          className="px-3 py-1 rounded bg-yellow-500 text-white"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(g.id)}
                          className="px-3 py-1 rounded bg-red-600 text-white"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
