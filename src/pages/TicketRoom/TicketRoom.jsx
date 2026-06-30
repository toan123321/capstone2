import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import movieApi from "../../api/movieApi";

function TicketRoom() {
  const { id } = useParams();

  const [ticketRoom, setTicketRoom] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    movieApi
      .get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`)
      .then((res) => {
        console.log(res.data.content);
        setTicketRoom(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!ticketRoom) {
    return (
      <h2 className="text-center mt-5">
        Đang tải...
      </h2>
    );
  }

  const handleBooking = () => {
    const data = {
      maLichChieu: Number(id),
      danhSachVe: selectedSeats.map((seat) => ({
        maGhe: seat.maGhe,
        giaVe: seat.giaVe,
      })),
    };

    movieApi
      .post("/QuanLyDatVe/DatVe", data)
      .then(() => {
        alert("Đặt vé thành công!");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert("Đặt vé thất bại!");
      });
  };

  return (
    <div className="container mt-5">

  <div className="card shadow-lg border-0 rounded-4 p-4">

    <h2 className="text-center text-danger fw-bold mb-4">
      🎬 PHÒNG VÉ
    </h2>

    <div className="row">

      <div className="col-md-4">

        <img
          src={ticketRoom.thongTinPhim.hinhAnh}
          alt={ticketRoom.thongTinPhim.tenPhim}
          className="img-fluid rounded shadow"
        />

      </div>

      <div className="col-md-8">

        <h3>{ticketRoom.thongTinPhim.tenPhim}</h3>

        <p>
          <b>🎭 Rạp:</b> {ticketRoom.thongTinPhim.tenCumRap}
        </p>

        <p>
          <b>📍 Địa chỉ:</b> {ticketRoom.thongTinPhim.diaChi}
        </p>

        <p>
          <b>🕒 Suất chiếu:</b>{" "}
          {ticketRoom.thongTinPhim.ngayChieu} -{" "}
          {ticketRoom.thongTinPhim.gioChieu}
        </p>

      </div>

    </div>

    <div className="text-center mt-5 mb-4">

      <div
        style={{
          width: "80%",
          height: "12px",
          background: "#ddd",
          margin: "auto",
          borderRadius: "30px",
          boxShadow: "0 5px 20px rgba(0,0,0,.4)",
        }}
      ></div>

      <h5 className="mt-3 text-secondary">
        MÀN HÌNH CHIẾU
      </h5>

    </div>

    <div className="d-flex justify-content-center gap-4 mb-4">

      <div>
        <button className="btn btn-secondary"></button>
        <span className="ms-2">Ghế thường</span>
      </div>

      <div>
        <button className="btn btn-warning"></button>
        <span className="ms-2">Ghế VIP</span>
      </div>

      <div>
        <button className="btn btn-success"></button>
        <span className="ms-2">Đang chọn</span>
      </div>

      <div>
        <button className="btn btn-danger"></button>
        <span className="ms-2">Đã đặt</span>
      </div>

    </div>

    <div className="row">

      {ticketRoom.danhSachGhe.map((ghe) => (

        <div
          key={ghe.maGhe}
          className="col-lg-1 col-md-2 col-2 mb-3"
        >

          <button
            className={`btn w-100 ${
              ghe.daDat
                ? "btn-danger"
                : selectedSeats.find(
                    (seat) => seat.maGhe === ghe.maGhe
                  )
                ? "btn-success"
                : ghe.loaiGhe === "Vip"
                ? "btn-warning"
                : "btn-secondary"
            }`}
            style={{
              borderRadius: "10px",
              fontWeight: "bold",
            }}
            disabled={ghe.daDat}
            onClick={() => {
              const exist = selectedSeats.find(
                (seat) => seat.maGhe === ghe.maGhe
              );

              if (exist) {
                setSelectedSeats(
                  selectedSeats.filter(
                    (seat) => seat.maGhe !== ghe.maGhe
                  )
                );
              } else {
                setSelectedSeats([
                  ...selectedSeats,
                  ghe,
                ]);
              }
            }}
          >
            {ghe.tenGhe}
          </button>

        </div>

      ))}

    </div>

    <div className="alert alert-info mt-4">

      <h5>
        🎟 Ghế đã chọn
      </h5>

      <p className="mb-0">

        {selectedSeats.length === 0
          ? "Chưa chọn ghế"
          : selectedSeats
              .map((seat) => seat.tenGhe)
              .join(", ")}

      </p>

    </div>

    <div className="alert alert-success">

      <h4 className="mb-0">

        💰 Tổng tiền:{" "}

        {selectedSeats
          .reduce(
            (total, seat) => total + seat.giaVe,
            0
          )
          .toLocaleString()}

        {" "}VNĐ

      </h4>

    </div>

    <button
      className="btn btn-danger btn-lg w-100"
      disabled={selectedSeats.length === 0}
      onClick={handleBooking}
    >
      🎫 ĐẶT VÉ NGAY
    </button>

  </div>

</div>

);
}

export default TicketRoom;