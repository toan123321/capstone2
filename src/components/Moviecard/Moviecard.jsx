import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <div
      className="card h-100 shadow border-0"
      style={{
        transition: "0.3s",
        borderRadius: "15px",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <img
        src={movie.hinhAnh}
        alt={movie.tenPhim}
        className="card-img-top"
        style={{
          height: "420px",
          objectFit: "cover",
        }}
      />

      <div className="card-body d-flex flex-column">
        <h5
          className="fw-bold"
          style={{
            minHeight: "55px",
          }}
        >
          {movie.tenPhim}
        </h5>

        <p className="text-warning fs-5">
          ⭐ {movie.danhGia}/10
        </p>

        <div className="mt-auto">
          <Link
            to={`/detail/${movie.maPhim}`}
            className="btn btn-dark w-100 mb-2"
          >
            Chi tiết
          </Link>

          <Link
            to={`/detail/${movie.maPhim}`}
            className="btn btn-danger w-100"
          >
            Đặt vé
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;