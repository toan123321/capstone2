import axios from "axios";

const movieApi = axios.create({
    baseURL: "https://movienew.cybersoft.edu.vn/api",
    headers: {
        TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA5MyIsIkhldEhhblN0cmluZyI6IjA0LzEyLzIwMjYiLCJIZXRIYW5UaW1lIjoiMTc5NjM0MjQwMDAwMCIsIm5iZiI6MTc2Nzk3ODAwMCwiZXhwIjoxNzk2NDkwMDAwfQ.DcungLS2D0-V5FlObrYQNV283QRSfZfrw3c0RHFR02Q",
    },
});

movieApi.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem("USER_LOGIN"));

    console.log("USER_LOGIN:", user);

    if (user) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
        console.log("Authorization:", config.headers.Authorization);
    }

    return config;
});

export default movieApi;