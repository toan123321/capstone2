import { BrowserRouter, Route, Routes } from "react-router-dom";

import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import TicketRoom from "./pages/TicketRoom/TicketRoom";

import AddMovie from "./pages/Admin/AddMovie";
import AddUser from "./pages/Admin/AddUser";
import Dashboard from "./pages/Admin/Dashboard";
import EditMovie from "./pages/Admin/EditMovie";
import EditUser from "./pages/Admin/EditUser";
import MovieManagement from "./pages/Admin/MovieManagement";
import UserManagement from "./pages/Admin/UserManagement";

import ProtectedRoute from "./routes/ProtectedRoute";

import AdminHome from "./pages/Admin/AdminHome";
import AdminRoute from "./routes/AdminRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* USER */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/detail/:id" element={<Detail />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ticketroom/:id"
          element={
            <ProtectedRoute>
              <TicketRoom />
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}

      
        <Route
  path="/admin"
  element={
    <AdminRoute>
      <Dashboard />
    </AdminRoute>
  }
>
<Route index element={<AdminHome />} />
  <Route path="movie" element={<MovieManagement />} />

  <Route path="movie/add" element={<AddMovie />} />

  <Route
    path="movie/edit/:id"
    element={<EditMovie />}
  />

  <Route path="user" element={<UserManagement />} />

  <Route path="user/add" element={<AddUser />} />

  <Route
    path="user/edit/:taiKhoan"
    element={<EditUser />}
  />
</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

