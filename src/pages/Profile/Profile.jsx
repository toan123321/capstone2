import { useEffect, useState } from "react";
import movieApi from "../../api/movieApi";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDT: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "KhachHang",
    hoTen: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("USER_LOGIN"));

    movieApi
      .post(
        "/QuanLyNguoiDung/ThongTinTaiKhoan",
        {},
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        setProfile(res.data.content);
        setForm({
            taiKhoan: res.data.content.taiKhoan,
            matKhau: "",
            email: res.data.content.email,
            soDT: res.data.content.soDT,
            maNhom: "GP01",
            maLoaiNguoiDung: res.data.content.maLoaiNguoiDung,
            hoTen: res.data.content.hoTen,
      });
    })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!profile) {
    return <h2 className="text-center mt-5">Đang tải...</h2>;
  }

  return (
    <div className="container mt-5">

      <div className="card shadow p-4">

        <h2 className="text-center mb-4">
          Thông tin tài khoản
        </h2>

        <table className="table table-bordered">

          <tbody>

            <tr>
              <th>Tài khoản</th>
              <td>{profile.taiKhoan}</td>
            </tr>

            <tr>
              <th>Họ tên</th>
              <td>{profile.hoTen}</td>
            </tr>

            <tr>
              <th>Email</th>
              <td>{profile.email}</td>
            </tr>

            <tr>
              <th>Số điện thoại</th>
              <td>{profile.soDT}</td>
            </tr>

            <tr>
              <th>Loại tài khoản</th>
              <td>{profile.maLoaiNguoiDung}</td>
            </tr>

          </tbody>

        </table>

      </div>

      <h3 className="mt-5 mb-4">
        Lịch sử đặt vé
      </h3>

      {profile.thongTinDatVe.length === 0 ? (
        <h5>Chưa có vé nào.</h5>
      ) : (
        profile.thongTinDatVe.map((ve) => (
          <div
            key={ve.maVe}
            className="card mb-4 shadow"
          >
            <div className="row g-0">

              <div className="col-md-3">

                <img
                  src={ve.hinhAnh}
                  className="img-fluid rounded-start"
                  alt={ve.tenPhim}
                />

              </div>

              <div className="col-md-9">

                <div className="card-body">

                  <h4>{ve.tenPhim}</h4>

                  <p>
                    <b>Ngày đặt:</b>{" "}
                    {new Date(
                      ve.ngayDat
                    ).toLocaleString("vi-VN")}
                  </p>

                  <p>
                    <b>Rạp:</b>{" "}
                    {ve.danhSachGhe[0].tenHeThongRap}
                  </p>

                  <p>
                    <b>Cụm rạp:</b>{" "}
                    {ve.danhSachGhe[0].tenCumRap}
                  </p>

                  <p>
                    <b>Ghế:</b>{" "}
                    {ve.danhSachGhe
                      .map((ghe) => ghe.tenGhe)
                      .join(", ")}
                  </p>

                </div>

              </div>

            </div>

          </div>
        ))
      )}

    </div>
  );
}

export default Profile;