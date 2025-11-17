import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../../_api";

export default function AdminAuthors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const res = await API.get("/authors");
      setAuthors(res.data.data);
    } catch (err) {
      console.error("Gagal memuat author:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Yakin ingin menghapus author ini?")) return;

    try {
      await API.delete(`/authors/${id}`);
      loadData();
      alert("Author berhasil dihapus!");
    } catch (err) {
      alert("Gagal menghapus author.");
    }
  }

  return (
    <div className="p-6">
      <div className="bg-white border border-gray-200 rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Data Author</h2>

          <Link
            to="/admin/authors/create"
            className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
          >
            Tambah Author
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
                  <th className="px-6 py-3">Nama</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {authors.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-3 text-center">
                      Belum ada data.
                    </td>
                  </tr>
                ) : (
                  authors.map((a, i) => (
                    <tr key={a.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-3">{i + 1}</td>
                      <td className="px-6 py-3">{a.name}</td>
                      <td className="px-6 py-3">{a.email || "-"}</td>

                      <td className="px-6 py-3 flex gap-2">
                        <button
                          onClick={() => navigate(`/admin/authors/edit/${a.id}`)}
                          className="px-3 py-1 rounded bg-yellow-500 text-white"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(a.id)}
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
