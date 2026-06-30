import Swal from "sweetalert2";

export const successAlert = (title, text) => {
    Swal.fire({
        icon: "success",
        title,
        text,
        confirmButtonColor: "#3085d6",
    });
};

export const errorAlert = (title, text) => {
    Swal.fire({
        icon: "error",
        title,
        text,
        confirmButtonColor: "#d33",
    });
};

export const warningAlert = (title, text) => {
    Swal.fire({
        icon: "warning",
        title,
        text,
        confirmButtonColor: "#f39c12",
    });
};

export const confirmDelete = () => {
    return Swal.fire({
        title: "Bạn có chắc?",
        text: "Bạn sẽ không thể khôi phục dữ liệu!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Xóa",
        cancelButtonText: "Hủy",
    });
};