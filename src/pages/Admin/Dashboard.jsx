import { Link, Outlet } from "react-router-dom";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("USER_LOGIN"));

  const handleLogout = () => {
    localStorage.removeItem("USER_LOGIN");
    window.location.href = "/";
  };

  return (
    <div className="d-flex">

      {/* Sidebar */}
      <div
        className="bg-dark text-white shadow"
        style={{
          width: "260px",
          minHeight: "100vh",
          padding: "25px",
        }}
      >
        <h3 className="text-center fw-bold mb-4">
          🎬 Movie Booking
        </h3>

        <hr />

        <div className="d-grid gap-2">

          <Link
            to="/admin"
            className="btn btn-outline-light text-start"
          >
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </Link>

          <Link
            to="/admin/movie"
            className="btn btn-outline-light text-start"
          >
            <i className="bi bi-film me-2"></i>
            Quản lý phim
          </Link>

          <Link
            to="/admin/user"
            className="btn btn-outline-light text-start"
          >
            <i className="bi bi-people me-2"></i>
            Quản lý người dùng
          </Link>

        </div>

        <hr className="my-4" />

        <div className="text-center">

          <i
            className="bi bi-person-circle"
            style={{
              fontSize: "60px",
              color: "#ffc107",
            }}
          ></i>

          <h5 className="mt-2">
            {user?.hoTen || "Admin"}
          </h5>

          <p className="text-secondary">
            {user?.taiKhoan}
          </p>

        </div>

        <div className="d-grid gap-2 mt-4">

          <Link
            to="/"
            className="btn btn-warning"
          >
            <i className="bi bi-house-door me-2"></i>
            Trang chủ
          </Link>

          <button
            className="btn btn-danger"
            onClick={handleLogout}
          >
            <i className="bi bi-box-arrow-right me-2"></i>
            Đăng xuất
          </button>

        </div>

      </div>

      {/* Nội dung */}

      <div
        className="flex-grow-1"
        style={{
          background: "#f5f7fb",
          padding: "30px",
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </div>

    </div>
  );
}

export default Dashboard;