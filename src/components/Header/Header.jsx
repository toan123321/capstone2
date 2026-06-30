
import { Link } from "react-router-dom";

function Header() {
  const user = JSON.parse(
    localStorage.getItem("USER_LOGIN") || "null"
  );

  const handleLogout = () => {
    localStorage.removeItem("USER_LOGIN");
    window.location.href = "/";
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        background: "linear-gradient(to right, #141E30, #243B55)",
      }}
    >
      <div className="container">

        <Link
          className="navbar-brand fw-bold fs-3"
          to="/"
        >
          🎬 Movie Booking
        </Link>

        <div className="ms-auto">

          {user ? (
            <>
              <span className="text-white me-3">
                Xin chào,
                <b className="text-warning">
                  {" "}
                  {user.hoTen}
                </b>
              </span>

              <Link
                to="/profile"
                className="btn btn-warning me-2"
              >
                Cá nhân
              </Link>

              <button
                className="btn btn-outline-light"
                onClick={handleLogout}
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link
                className="btn btn-outline-light me-2"
                to="/login"
              >
                Đăng nhập
              </Link>

              <Link
                className="btn btn-warning"
                to="/register"
              >
                Đăng ký
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Header;

