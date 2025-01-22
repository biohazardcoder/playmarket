import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("user");
console.log(token);

const instance = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
        Authorization: token,
    },
});

export default instance;