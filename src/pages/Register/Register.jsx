import { useState } from "react";
import { useNavigate } from "react-router-dom";
import movieApi from "../../api/movieApi";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "KhachHang",
    hoTen: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    movieApi
      .post("/QuanLyNguoiDung/DangKy", user)
      .then(() => {
        alert("Đăng ký thành công!");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response?.data);
        alert("Đăng ký thất bại!");
      });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4">Đăng ký</h2>

      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <label>Tài khoản</label>
          <input
            type="text"
            className="form-control"
            name="taiKhoan"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Mật khẩu</label>
          <input
            type="password"
            className="form-control"
            name="matKhau"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Họ tên</label>
          <input
            type="text"
            className="form-control"
            name="hoTen"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Số điện thoại</label>
          <input
            type="text"
            className="form-control"
            name="soDt"
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-success w-100">
          Đăng ký
        </button>
      </form>
    </div>
  );
}

export default Register;