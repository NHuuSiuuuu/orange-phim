import PageHome from "~/pages/PageHome";
import LayoutDefault from "~/layout/LayoutDefault";
import PageMovieSeries from "~/pages/PageMovieSeries";
import PageMovieSingle from "~/pages/PageMovieSingle";
import PageNation from "~/pages/PageNation/PageNation";
import PageDetail from "~/pages/PageDetail";
import PageMovieDetail from "~/pages/PageMovieDetail";
import PageNationList from "~/pages/PageNation/PageNationList";

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
      {
        path: "phim/:slug",
        element: <PageMovieDetail />,
      },
    ],
  },
];
