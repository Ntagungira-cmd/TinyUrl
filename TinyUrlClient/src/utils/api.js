//base url
export const API_URL = "https://tinyurl-a9jg.onrender.com";

//retrieve token from local storage
export const config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};
