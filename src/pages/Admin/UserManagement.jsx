import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import movieApi from "../../api/movieApi";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    movieApi
      .get("/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01")
      .then((res) => {
        setUsers(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (taiKhoan) => {
    if (!window.confirm("Bạn có chắc muốn xóa?")) return;

    movieApi
      .delete(`/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
      .then(() => {
        alert("Xóa thành công!");
        getUsers();
      })
      .catch((err) => {
        console.log(err);
        alert("Không thể xóa!");
      });
  };

  return (
    <div className="container-fluid p-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>👤 Quản lý người dùng</h2>

        <Link
          to="/admin/user/add"
          className="btn btn-success"
        >
          + Thêm người dùng
        </Link>

      </div>

      {/* Thanh tìm kiếm */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Nhập tài khoản hoặc họ tên..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <table className="table table-bordered table-hover">

        <thead className="table-dark">

          <tr>
            <th>Tài khoản</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Loại</th>
            <th width="180">Thao tác</th>
          </tr>

        </thead>

        <tbody>

          {users
            .filter(
              (user) =>
                user.taiKhoan
                  .toLowerCase()
                  .includes(keyword.toLowerCase()) ||
                user.hoTen
                  .toLowerCase()
                  .includes(keyword.toLowerCase())
            )
            .map((user) => (

              <tr key={user.taiKhoan}>

                <td>{user.taiKhoan}</td>

                <td>{user.hoTen}</td>

                <td>{user.email}</td>

                <td>{user.soDt}</td>

                <td>{user.maLoaiNguoiDung}</td>

                <td>

                  <Link
                    to={`/admin/user/edit/${user.taiKhoan}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Sửa
                  </Link>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user.taiKhoan)}
                  >
                    Xóa
                  </button>

                </td>

              </tr>

            ))}

        </tbody>

      </table>

    </div>
  );
}

export default UserManagement;