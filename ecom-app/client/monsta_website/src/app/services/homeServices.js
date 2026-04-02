import axios from "axios";
let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEPATH;
let getProductbyType = (type) => {
  return axios
    .get(`${apiBaseUrl}home/get-product/${type}`)
    .then((res) => res.data)
    .then((finalRes) => finalRes);
};

let getProductDetails = (slug) => {
  return axios
    .get(`${apiBaseUrl}home/get-product-details/${slug}`)
    .then((res) => res.data)
    .then((finalRes) => finalRes);
};

export { getProductbyType, getProductDetails };
