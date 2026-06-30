import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("USER_LOGIN"));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.maLoaiNguoiDung !== "QuanTri") {
    alert("Bạn không có quyền truy cập!");
    return <Navigate to="/" />;
  }

  return children;
}

export default AdminRoute;