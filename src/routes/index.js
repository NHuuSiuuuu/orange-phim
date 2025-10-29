import PageHome from "~/pages/PageHome";
import LayoutDefault from "~/layout/LayoutDefault";
import PageMovieSeries from "~/pages/PageFilmSeries";

import PageFilmView from "~/pages/PageFilmView";
import PageFilmsCategory from "~/pages/PageFilmsCategory";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "/",
        element: <PageHome />,
      },
      {
        path: "danh-sach/:slug",
        element: <PageMovieSeries type='danh-sach' />,
      },
      {
        path: "quoc-gia/:slug",
        element: <PageMovieSeries type="quoc-gia"/>
      },
      

      {
        path: "phim/:slug",
        element: <PageFilmView />,
      },
      {
        path: "the-loai/:slug",
        element: <PageFilmsCategory />,
      },
    ],
  },
];
