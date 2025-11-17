import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../_api";

export default function Register() {
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // VALIDASI SEDERHANA
    if (!nama || !email || !username || !password) {
      setError("Semua field wajib diisi!");
      return;
    }

    if (!validateEmail(email)) {
      setError("Format email tidak valid!");
      return;
    }

    try {
      // DATA DIKIRIM KE BACKEND
      await API.post("/register", {
        name: nama,
        email,
        username,
        password,
      });

      alert("Registrasi berhasil! Silakan login.");
      navigate("/login");
    } catch (err) {
      setError("Registrasi gagal. Coba lagi.");
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6 dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Registrasi Pengguna
        </h1>

        {error && (
          <div className="p-3 mb-4 text-sm text-red-800 rounded bg-red-50">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Nama Lengkap</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Masukkan nama lengkap..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg py-2"
          >
            Daftar Sekarang
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Sudah punya akun?{" "}
          <a href="/login" className="text-indigo-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </section>
  );
}
