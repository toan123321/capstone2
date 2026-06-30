import { useState } from "react";
import { useNavigate } from "react-router-dom";
import movieApi from "../../api/movieApi";
import {
    errorAlert,
    successAlert,
} from "../../utils/alert";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    movieApi
      .post("/QuanLyNguoiDung/DangNhap", user)
      .then((res) => {
        localStorage.setItem(
          "USER_LOGIN",
          JSON.stringify(res.data.content)
        );

        successAlert(
          "Đăng nhập thành công",
          "Chào mừng bạn quay trở lại!"
        );

        navigate("/");
      })
      .catch((err) => {
        console.log(err);

        errorAlert(
          "Đăng nhập thất bại",
          "Sai tài khoản hoặc mật khẩu!"
        );
      });
  };

  return (
    <div
      className="container mt-5"
      style={{ maxWidth: "500px" }}
    >
      <h2 className="text-center mb-4">
        Đăng nhập
      </h2>

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">
            Tài khoản
          </label>

          <input
            type="text"
            className="form-control"
            name="taiKhoan"
            value={user.taiKhoan}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Mật khẩu
          </label>

          <input
            type="password"
            className="form-control"
            name="matKhau"
            value={user.matKhau}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default Login;