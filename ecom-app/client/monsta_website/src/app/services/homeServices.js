import axios from "axios";
let apiBaseUrl = process.env.NEXT_PUBLIC_APIBASEPATH;
let getProductbyType = (type) => {

  try{
     return axios
    .get(`${apiBaseUrl}home/get-product/${type}`)
    .then((res) => res.data)
    .then((finalRes) => finalRes);
  }
  catch{
    return null
  }
 
};

let getProductDetails = (slug) => {
  return axios
    .get(`${apiBaseUrl}home/get-product-details/${slug}`)
    .then((res) => res.data)
    .then((finalRes) => finalRes);
};

export { getProductbyType, getProductDetails };
