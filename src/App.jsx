import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/public";
import PublicLayout from "./layouts/public";
import Books from "./pages/public/books";
import Login from "./pages/auth/login";

import AdminLayout from "./layouts/admin";
import Dashboard from "./pages/admin";

import AdminBooks from "./pages/admin/books";
import BookCreate from "./pages/admin/books/create";

import AdminGenres from "./pages/admin/genres";
import GenreCreate from "./pages/admin/genres/create";

import AdminAuthors from "./pages/admin/authors";
import AuthorCreate from "./pages/admin/authors/create";

import EditGenre from "./pages/admin/genres/edit";
import EditAuthor from "./pages/admin/authors/edit";


import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/auth/register";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          {/* PUBLIC LAYOUT */}
          <Route element={<PublicLayout />}>
            {/* PUBLIC PAGES */}
            <Route index element={<Home />} />
            <Route path="books" element={<Books />} />

            {/* AUTH */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* ADMIN */}
            <Route
              path="admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}> 
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              {/* DASHBOARD */}
              <Route index element={<Dashboard />} />

              {/* BOOKS */}
              <Route path="books">
                <Route index element={<AdminBooks />} />
                <Route path="create" element={<BookCreate />} />
              </Route>

              {/* GENRES */}
              <Route path="genres">
                <Route index element={<AdminGenres />} />
                <Route path="create" element={<GenreCreate />} />
                <Route path="edit/:id" element={<EditGenre />} />
              </Route>

              {/* AUTHORS */}
              <Route path="authors">
                <Route index element={<AdminAuthors />} />
                <Route path="create" element={<AuthorCreate />} />
                <Route path="edit/:id" element={<EditAuthor />} />
              </Route>
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
