import { useState } from "react";
import { useNavigate } from "react-router-dom";
import movieApi from "../../api/movieApi";

function AddMovie() {
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    tenPhim: "",
    trailer: "",
    moTa: "",
    ngayKhoiChieu: "",
    danhGia: 0,
    hot: false,
    dangChieu: false,
    sapChieu: false,
    hinhAnh: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setMovie({
      ...movie,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImage = (e) => {
    setMovie({
      ...movie,
      hinhAnh: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!movie.hinhAnh) {
      alert("Phải chọn hình ảnh");
      return;
    }
  
    const formData = new FormData();
  
    const date = movie.ngayKhoiChieu.split("-");
  
    formData.append("tenPhim", movie.tenPhim);
    formData.append("trailer", movie.trailer);
    formData.append("moTa", movie.moTa);
  
    formData.append(
      "ngayKhoiChieu",
      `${date[2]}/${date[1]}/${date[0]}`
    );
  
    formData.append("danhGia", Number(movie.danhGia));
    formData.append("hot", movie.hot);
    formData.append("dangChieu", movie.dangChieu);
    formData.append("sapChieu", movie.sapChieu);
    formData.append("maNhom", "GP01");
  
    formData.append(
      "hinhAnh",
      movie.hinhAnh,
      movie.hinhAnh.name
    );
  
    movieApi
      .post("/QuanLyPhim/ThemPhimUploadHinh", formData)
      .then(() => {
        alert("Thêm phim thành công!");
      })
      .catch((err) => {
        console.log(err.response?.data);
        alert("Thêm phim thất bại!");
      });
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">
        Thêm phim
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label>Tên phim</label>

          <input
            className="form-control"
            name="tenPhim"
            value={movie.tenPhim}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Trailer</label>

          <input
            className="form-control"
            name="trailer"
            value={movie.trailer}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Mô tả</label>

          <textarea
            className="form-control"
            name="moTa"
            value={movie.moTa}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label>Ngày khởi chiếu</label>

          <input
            type="date"
            className="form-control"
            name="ngayKhoiChieu"
            value={movie.ngayKhoiChieu}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Đánh giá</label>

          <input
            type="number"
            className="form-control"
            name="danhGia"
            value={movie.danhGia}
            onChange={handleChange}
            min="1"
            max="10"
            required
          />
        </div>

        <div className="mb-3">
          <label>Hình ảnh</label>

          <input
            type="file"
            className="form-control"
            accept=".jpg,.jpeg,.png"
            onChange={handleImage}
            required
          />
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="hot"
            checked={movie.hot}
            onChange={handleChange}
          />

          <label className="form-check-label">
            Hot
          </label>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="dangChieu"
            checked={movie.dangChieu}
            onChange={handleChange}
          />

          <label className="form-check-label">
            Đang chiếu
          </label>
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            name="sapChieu"
            checked={movie.sapChieu}
            onChange={handleChange}
          />

          <label className="form-check-label">
            Sắp chiếu
          </label>
        </div>

        <button className="btn btn-success">
          Thêm phim
        </button>

      </form>

    </div>
  );
}

export default AddMovie;