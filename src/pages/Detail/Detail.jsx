import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import movieApi from "../../api/movieApi";

function Detail() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    movieApi
      .get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`)
      .then((res) => {
        console.log(res.data.content);
        setMovie(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!movie) {
    return <h2 className="text-center mt-5">Đang tải...</h2>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <img
            src={movie.hinhAnh}
            alt={movie.tenPhim}
            className="img-fluid rounded"
          />
        </div>

        <div className="col-md-8">
          <h1>{movie.tenPhim}</h1>

          <p>
            <b>Ngày khởi chiếu:</b>{" "}
            {new Date(movie.ngayKhoiChieu).toLocaleDateString("vi-VN")}
          </p>

          <p>
            <b>Đánh giá:</b> {movie.danhGia}
          </p>

          <p>{movie.moTa}</p>
        </div>
      </div>

      <hr />

      <h2 className="mt-4">Lịch chiếu</h2>

      {movie.heThongRapChieu.map((heThongRap) => (
        <div key={heThongRap.maHeThongRap} className="mt-4">

          <h4>{heThongRap.tenHeThongRap}</h4>

          {heThongRap.cumRapChieu.map((cumRap) => (
            <div
              key={cumRap.maCumRap}
              className="border rounded p-3 mb-3"
            >
              <h5>{cumRap.tenCumRap}</h5>

              <p>{cumRap.diaChi}</p>

              <div className="d-flex flex-wrap gap-2">
                {cumRap.lichChieuPhim.map((lichChieu) => (
                  <Link
                    key={lichChieu.maLichChieu}
                    to={`/ticketroom/${lichChieu.maLichChieu}`}
                    className="btn btn-danger"
                  >
                    {new Date(
                      lichChieu.ngayChieuGioChieu
                    ).toLocaleString("vi-VN")}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Detail;