import "./Wrapper.scss";
import { getFilmsChina, getFilmsKorea, getFilmsUs } from "~/services";

import { useFilms } from "~/hooks/useFilms";
import FilmSelection from "../FilmSelection";
import FilmCategory from "../FilmCategory";

function Wrapper() {
  // const { films: koreaFilms, loading: loadingKorea } = useFilms(getFilmsKorea);
  // const { films: chinaFilms, loading: loadingChina } = useFilms(getFilmsChina);
  // const { films: ukFilms, loading: loadingUk } = useFilms(getFilmsUs);

  return (
    <div className="wrapper">
      <div className="fluid-gap">
        {/*Khe hở */}
        {/* <FilmCategory/> */}
 
        {/* List phim */}
        {/* <FilmSelection
          films={koreaFilms}
          title="Phim Hàn Quốc Mới"
          loading={loadingKorea}
        />
        <FilmSelection
          films={chinaFilms}
          title="Phim Trung Quốc Mới"
          loading={loadingChina}
        />
        <FilmSelection
          films={ukFilms}
          title="Phim Âu Mỹ Mới"
          loading={loadingUk}
        /> */}
      </div>
    </div>
  );
}

export default Wrapper;
