import { useState } from "react";
import movieApi from "../../api/movieApi";

function AddUser() {
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "KhachHang",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    movieApi
      .post("/QuanLyNguoiDung/ThemNguoiDung", user)
      .then(() => {
        alert("Thêm người dùng thành công!");
      })
      .catch((err) => {
        console.log(err);
        alert("Không có quyền hoặc thêm thất bại!");
      });
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">
        Thêm người dùng
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label>Tài khoản</label>
          <input
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
            className="form-control"
            name="hoTen"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            className="form-control"
            name="email"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Số điện thoại</label>
          <input
            className="form-control"
            name="soDt"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Loại người dùng</label>

          <select
            className="form-select"
            name="maLoaiNguoiDung"
            onChange={handleChange}
          >
            <option value="KhachHang">
              Khách hàng
            </option>

            <option value="QuanTri">
              Quản trị
            </option>

          </select>

        </div>

        <button className="btn btn-success">
          Thêm người dùng
        </button>

      </form>

    </div>
  );
}

export default AddUser;