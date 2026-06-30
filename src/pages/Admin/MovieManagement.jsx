import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import movieApi from "../../api/movieApi";

function MovieManagement() {
  const [movies, setMovies] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = () => {
    movieApi
      .get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP01")
      .then((res) => {
        setMovies(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (maPhim) => {
    if (!window.confirm("Bạn có chắc muốn xóa phim này?")) {
      return;
    }

    movieApi
      .delete(`/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
      .then(() => {
        alert("Xóa phim thành công!");
        getMovies();
      })
      .catch((err) => {
        console.log(err);
        alert("Không thể xóa phim!");
      });
  };

  return (
    <div className="container-fluid p-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>🎬 Quản lý phim</h2>

        <Link
          to="/admin/movie/add"
          className="btn btn-success"
        >
          + Thêm phim
        </Link>

      </div>

      {/* Thanh tìm kiếm */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Nhập tên phim..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <table className="table table-bordered table-hover align-middle">

        <thead className="table-dark">

          <tr>
            <th>Mã</th>
            <th>Hình ảnh</th>
            <th>Tên phim</th>
            <th>Ngày khởi chiếu</th>
            <th>Đánh giá</th>
            <th width="180">Thao tác</th>
          </tr>

        </thead>

        <tbody>

          {movies
            .filter((movie) =>
              movie.tenPhim
                .toLowerCase()
                .includes(keyword.toLowerCase())
            )
            .map((movie) => (

              <tr key={movie.maPhim}>

                <td>{movie.maPhim}</td>

                <td>
                  <img
                    src={movie.hinhAnh}
                    alt={movie.tenPhim}
                    width="80"
                    className="rounded"
                  />
                </td>

                <td>{movie.tenPhim}</td>

                <td>
                  {new Date(movie.ngayKhoiChieu).toLocaleDateString("vi-VN")}
                </td>

                <td>{movie.danhGia}</td>

                <td>

                  <Link
                    to={`/admin/movie/edit/${movie.maPhim}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Sửa
                  </Link>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(movie.maPhim)}
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

export default MovieManagement;