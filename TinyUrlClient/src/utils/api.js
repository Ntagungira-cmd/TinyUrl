export const API_URL = "https://tinyurl-a9jg.onrender.com";
//export const API_URL = "http://localhost:8080";

//retrieve token from local storage
export const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};
