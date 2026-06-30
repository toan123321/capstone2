import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import movieApi from "../../api/movieApi";
import Banner from "../../components/Banner/Banner";
import Header from "../../components/Header/Header";
import MovieCard from "../../components/Moviecard/Moviecard";

function Home() {
const [movies, setMovies] = useState([]);
const [theaters, setTheaters] = useState([]);
const [selectedTheater, setSelectedTheater] = useState(null);
const navigate = useNavigate();

useEffect(() => {
    movieApi
    .get("/QuanLyPhim/LayDanhSachPhim?maNhom=GP01")
    .then((res) => {
        setMovies(res.data.content);
    })
    .catch((err) => {
        console.log(err);
    });
}, []);

useEffect(() => {
    movieApi
    .get("/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01")
    .then((res) => {
        setTheaters(res.data.content);
    })
    .catch((err) => {
        console.log(err);
    });
}, []);

return (
    <>
    <Header />

    <Banner />

    <div className="container mt-5">
    <h1
  className="text-center fw-bold mb-5"
  style={{
    color: "#dc3545",
    letterSpacing: "2px",
  }}
>
  🎬 MOVIE BOOKING
</h1>

        <h2 className="text-center mt-5">
        HỆ THỐNG RẠP
        </h2>

        <div className="row mt-4">
        {theaters.map((theater) => (
            <div
            className="col-md-2 text-center"
            key={theater.maHeThongRap}
            onClick={() => setSelectedTheater(theater)}
            style={{ cursor: "pointer" }}
            >
            <img
                src={theater.logo}
                alt={theater.tenHeThongRap}
                width="80"
            />

            <p className="mt-2">
                {theater.tenHeThongRap}
            </p>
            </div>
        ))}
        </div>

        {selectedTheater && (
        <div className="mt-5">
            <h3>{selectedTheater.tenHeThongRap}</h3>

            {selectedTheater.lstCumRap.map((cumRap) => (
            <div
                key={cumRap.maCumRap}
                className="border p-3 mb-3"
            >
                <h5>{cumRap.tenCumRap}</h5>

                <p>{cumRap.diaChi}</p>

                <div className="mt-3">
                {cumRap.danhSachPhim
                    ?.slice(0, 1)
                    .map((phim) =>
                    phim.lstLichChieuTheoPhim
                        ?.slice(0, 5)
                        .map((lichChieu) => (
                        <button
                        key={lichChieu.maLichChieu}
                        className="btn btn-success me-2 mb-2"
                        onClick={() =>
                        navigate(`/ticketroom/${lichChieu.maLichChieu}`)
                        }
                        >
                            {new Date(
                            lichChieu.ngayChieuGioChieu
                            ).toLocaleString("vi-VN")}
                        </button>
                        ))
                    )}
                </div>
            </div>
            ))}
        </div>
        )}

        <div className="row mt-5">
        {movies.map((movie) => (
            <div
            className="col-xl-3 col-lg-4 col-md-6 mb-4"
            key={movie.maPhim}
            >
            <MovieCard movie={movie} />
            </div>
        ))}
        </div>
    </div>
    </>
);
}

export default Home;