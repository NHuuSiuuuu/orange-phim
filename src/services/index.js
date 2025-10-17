// import { get } from "~/ultis/request";


import { request } from "~/ultis/request"; // `https://ophim1.com/v1/api/`
import { gett } from "~/ultis/request";

export const search = async (keyword) => {
  try{
    const res = await gett('/tim-kiem',{
      params: {
        keyword
      }
    })
    return res.data
  }catch (error) {
    console.log(error)
  }
}


export const getFilm = async () => {
  try{
    const res = await gett("quoc-gia");
    return res.data;

  }catch(error){
    console.log(error)
  }
};

// export const getFilmsKorea = async () => {
//   const result = await get("quoc-gia/han-quoc");
//   return result;
// };

// export const getFilmsChina = async () => {
//   const result = await get("quoc-gia/trung-quoc");
//   return result;
// };

// export const getFilmsUs = async () => {
//   const result = await get("quoc-gia/au-my");
//   return result;
// };

// export const getCategory = async () => {
//   const result = await get("the-loai");
//   return result;
// };

// export const search = async () => {
//   const result = await get("tim-kiem");
//   return result;
// };