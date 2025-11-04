// import { get } from "~/ultis/request";

// import { request } from "~/ultis/request"; // `https://ophim1.com/v1/api/`
// import {gett} from "~/ultis/request";
import * as request from "~/ultis/request";

export const search = async (keyword) => {
  try {
    const res = await request.getFromApi("/tim-kiem", {
      params: {
        keyword,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getCountry = async () => {
  try {
    const res = await request.getFromApi("quoc-gia");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async () => {
  try {
    const res = await request.getFromApi("the-loai");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFilmsCommon = async (type,slug, page) => {
  try {
    const res = await request.getFromApi(`${type}/${slug}?page=${page}&limit=30`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getListFilm = async (slug, page) => {
  try {
    const res = await request.getFromApi(`danh-sach/${slug}?page=${page}&limit=30`)
    return res.data
  }catch(error){
    console.log(error)
  }
}

export const getListFilmRecommended = async (slug) => {
  try {
    const res = await request.getFromApi(`${slug}?limit=30`)
    return res.data
  }catch(error){
    console.log(error)
  }
}


export const getFilmsKorea = async () => {
  try {
    const res = await request.getFromApi("quoc-gia/han-quoc");
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getFilmsChina = async () => {
  try {
    const res = await request.getFromApi("quoc-gia/trung-quoc");
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getFilmsUs = async () => {
  try {
    const res = await request.getFromApi("quoc-gia/au-my");
    return res;
  } catch (error) {
    console.log(error);
  }
};



export const getFilmsCategory = async (slug, page) => {
  try {
    const res = await request.getFromApi(`the-loai/${slug}?page=${page}&limit=30` );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};




export const getFilm = async (slug) => {
  try {
    const res = await request.getFromApi(`phim/${slug}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTypeListFilmHot = async () => {
  try {
    const res = await request.getFromApi("home");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFilmImage = async (slug) => {
  try {
    const res = await request.getFromApi("phim/" + slug + "/images");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCastList = async (slug) => {
  try{
    const res = await request.getFromApi("phim/"+ slug + "/peoples")
    return res.data
  } catch (error) {
    console.log(error)
  }
}

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
