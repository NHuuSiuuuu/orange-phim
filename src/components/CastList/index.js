import { useEffect, useState } from "react";
import { getCastList } from "~/services";
import classNames from "classnames/bind";
import { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./CastList.module.scss";
import noImage from "~/assets/img/noimage.jpeg"

function CastList(slug) {
  const cx = classNames.bind(styles);

  const [castList, setCastList] = useState([]);
  const listRef = useRef(null);
  // console.log(slug)
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCastList(slug.slug);
      setCastList(data?.peoples);
      // console.log(castList);
    };
    fetchData();
  }, [slug]);

const handleWheel = (e) => {
  listRef.current.scrollLeft += e.deltaY;
};


  return (
    <>
      <div className={cx("cards-row", "wide")}>
        <div className={cx("row-header h2")}>
          <h2> {castList == [] && castList && `Danh sách diễn viên`}</h2>
        </div>

        <div
          ref={listRef}
          onWheel={handleWheel}
          className={cx("list-cast")}
        >
          {castList?.map((item, index) => (
            <Link to={``} className={cx("row-cast")} key={index}>
              <div className={cx("i")}>
                <img
                  src={
                    item.profile_path
                      ? `https://image.tmdb.org/t/p/w185/${item.profile_path}`
                      : noImage
                  }
                  alt={item.name}
                />
              </div>
              <div className={cx("cast-name")}>
                <p> {item.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default CastList;
