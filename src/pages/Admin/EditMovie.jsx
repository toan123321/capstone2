import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import movieApi from "../../api/movieApi";

function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState({
    maPhim: "",
    tenPhim: "",
    biDanh:"",
    trailer: "",
    moTa: "",
    ngayKhoiChieu: "",
    danhGia: 0,
    hot: false,
    dangChieu: false,
    sapChieu: false,
    hinhAnh: null,
  });

  useEffect(() => {
    movieApi
      .get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`)
      .then((res) => {
        const data = res.data.content;

        setMovie({
          maPhim: data.maPhim,
          tenPhim: data.tenPhim,
          biDanh: data.biDanh,
          trailer: data.trailer,
          moTa: data.moTa,
          ngayKhoiChieu: data.ngayKhoiChieu.split("T")[0],
          danhGia: data.danhGia,
          hot: data.hot,
          dangChieu: data.dangChieu,
          sapChieu: data.sapChieu,
          hinhAnh: null,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

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
      alert("Vui lòng chọn hình ảnh mới!");
      return;
    }
  
    const formData = new FormData();
  
    formData.append("maPhim", movie.maPhim);
    formData.append("tenPhim", movie.tenPhim);
  
    formData.append(
      "biDanh",
      movie.biDanh ||
        movie.tenPhim
          .toLowerCase()
          .trim()
          .replace(/\s+/g, "-")
    );
  
    formData.append("trailer", movie.trailer);
    formData.append("moTa", movie.moTa);
  
    const date = new Date(movie.ngayKhoiChieu);
  
    formData.append(
      "ngayKhoiChieu",
      `${String(date.getDate()).padStart(2, "0")}/${String(
        date.getMonth() + 1
      ).padStart(2, "0")}/${date.getFullYear()}`
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
      .post("/QuanLyPhim/CapNhatPhimUpload", formData)
      .then(() => {
        alert("🎉 Cập nhật thành công!");
        navigate("/admin/movie");
      })
      .catch((err) => {
        console.log(err.response?.data);
        alert(err.response?.data?.content || "Cập nhật thất bại!");
      });
  };
  return (
    <div className="container mt-4">

      <h2 className="mb-4">
        Sửa phim
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label>Tên phim</label>

          <input
            className="form-control"
            name="tenPhim"
            value={movie.tenPhim}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Trailer</label>

          <input
            className="form-control"
            name="trailer"
            value={movie.trailer}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Mô tả</label>

          <textarea
            className="form-control"
            rows="4"
            name="moTa"
            value={movie.moTa}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Ngày khởi chiếu</label>

          <input
            type="date"
            className="form-control"
            name="ngayKhoiChieu"
            value={movie.ngayKhoiChieu}
            onChange={handleChange}
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
          />
        </div>

        <div className="mb-3">
          <label>Hình ảnh mới (không bắt buộc)</label>

          <input
            type="file"
            className="form-control"
            accept=".jpg,.jpeg,.png"
            onChange={handleImage}
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

        <button className="btn btn-warning">
          Cập nhật phim
        </button>

      </form>

    </div>
  );
}

export default EditMovie;