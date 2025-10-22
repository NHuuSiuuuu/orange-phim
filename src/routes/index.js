import PageHome from "~/pages/PageHome";
import LayoutDefault from "~/layout/LayoutDefault";
import PageMovieSeries from "~/pages/PageFilmSeries";
import PageMovieSingle from "~/pages/PageFilmSingle";
import PageNation from "~/pages/PageNation/PageNation";
import PageDetail from "~/pages/PageNation/PageListFilms";
import PageMovieDetail from "~/pages/PageMovieDetail";
import PageNationList from "~/pages/PageNation/PageNationList";
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
        path: "phim-bo",
        element: <PageMovieSeries />,
      },
      {
        path: "phim-le",
        element: <PageMovieSingle />,
      },
      {
        path: "quoc-gia",
        element: <PageNation />,
        children: [
          {
            index: true,
            element: <PageNationList/>,

          },
          {
            path: ":slug",
            element: <PageDetail />,
          },
        ],
      },
      // {
      //   path: "phim/:slug",
      //   element: <PageMovieDetail />,
      // },
      {
        path: "phim/:slug",
        element: <PageFilmView/>
      },
      {
        path: "the-loai/:slug",
        element: <PageFilmsCategory/>
      }
    ],
  },
];
