import { useEffect, useState } from "react";
import movieApi from "../../api/movieApi";

function AdminHome() {
  const [movieCount, setMovieCount] = useState(0);
  const [hotMovieCount, setHotMovieCount] = useState(0);
  const [dangChieuCount, setDangChieuCount] = useState(0);
  const [sapChieuCount, setSapChieuCount] = useState(0);

  useEffect(() => {
    movieApi
      .get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP01")
      .then((res) => {
        const movies = res.data.content;

        setMovieCount(movies.length);

        setHotMovieCount(
          movies.filter((movie) => movie.hot).length
        );

        setDangChieuCount(
          movies.filter((movie) => movie.dangChieu).length
        );

        setSapChieuCount(
          movies.filter((movie) => movie.sapChieu).length
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>

      <h2 className="mb-4 fw-bold">
        📊 Dashboard
      </h2>

      <div className="row">

        <div className="col-md-3 mb-4">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h1>🎬</h1>
              <h5>Tổng phim</h5>
              <h2 className="text-primary">
                {movieCount}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h1>🔥</h1>
              <h5>Phim Hot</h5>
              <h2 className="text-danger">
                {hotMovieCount}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h1>🎥</h1>
              <h5>Đang chiếu</h5>
              <h2 className="text-success">
                {dangChieuCount}
              </h2>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card shadow border-0">
            <div className="card-body text-center">
              <h1>📅</h1>
              <h5>Sắp chiếu</h5>
              <h2 className="text-warning">
                {sapChieuCount}
              </h2>
            </div>
          </div>
        </div>

      </div>

      <div className="card shadow mt-3">
        <div className="card-body">

          <h4>
            🎉 Chào mừng đến với Movie Booking Admin
          </h4>

          <p className="text-secondary mb-0">
            Tại đây bạn có thể quản lý phim, người dùng và hệ thống đặt vé.
          </p>

        </div>
      </div>

    </div>
  );
}

export default AdminHome;