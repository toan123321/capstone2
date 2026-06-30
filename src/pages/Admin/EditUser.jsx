import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import movieApi from "../../api/movieApi";

function EditUser() {
  const { taiKhoan } = useParams();

  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "KhachHang",
  });

  useEffect(() => {
    movieApi
      .get(`/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01&tuKhoa=${taiKhoan}`)
      .then((res) => {
        const data = res.data.content[0];

        if (data) {
          setUser({
            taiKhoan: data.taiKhoan,
            matKhau: "",
            hoTen: data.hoTen,
            email: data.email,
            soDt: data.soDt,
            maNhom: "GP01",
            maLoaiNguoiDung: data.maLoaiNguoiDung,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [taiKhoan]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(user);

    alert("Đã cập nhật giao diện. Khi có tài khoản Admin sẽ gọi API.");
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Sửa người dùng</h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label>Tài khoản</label>
          <input
            className="form-control"
            value={user.taiKhoan}
            disabled
          />
        </div>

        <div className="mb-3">
          <label>Mật khẩu mới</label>
          <input
            type="password"
            className="form-control"
            name="matKhau"
            value={user.matKhau}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Họ tên</label>
          <input
            className="form-control"
            name="hoTen"
            value={user.hoTen}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            className="form-control"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Số điện thoại</label>
          <input
            className="form-control"
            name="soDt"
            value={user.soDt}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Loại người dùng</label>

          <select
            className="form-select"
            name="maLoaiNguoiDung"
            value={user.maLoaiNguoiDung}
            onChange={handleChange}
          >
            <option value="KhachHang">Khách hàng</option>
            <option value="QuanTri">Quản trị</option>
          </select>

        </div>

        <button className="btn btn-warning">
          Cập nhật
        </button>

      </form>

    </div>
  );
}

export default EditUser;