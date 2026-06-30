import { useEffect, useState } from "react";
import movieApi from "../../api/movieApi";

function Banner() {
const [banners, setBanners] = useState([]);

useEffect(() => {
    movieApi
    .get("/QuanLyPhim/LayDanhSachBanner")
    .then((res) => {
        setBanners(res.data.content);
    })
    .catch((err) => {
        console.log(err);
    });
}, []);

return (
    <div
    id="carouselMovie"
    className="carousel slide"
    data-bs-ride="carousel"
    >
    <div className="carousel-inner">
        {banners.map((banner, index) => (
        <div
            key={banner.maBanner}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
        >
            <img
            src={banner.hinhAnh}
            className="d-block w-100"
            alt=""
            style={{
                height: "500px",
                objectFit: "cover",
            }}
            />
        </div>
        ))}
    </div>
    </div>
);
}

export default Banner;