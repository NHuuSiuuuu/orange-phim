import { useState, useEffect } from "react";
import { getCategory } from "~/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftRight } from "@fortawesome/free-solid-svg-icons";
import styles from "./FilmCategory.module.scss";
// import classNames from "classnames/bind";
import classNames from 'classnames/bind'


function FilmCategory() {
  const cx = classNames.bind(styles);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getCategory();
      setCategories(result.items);
    };
    fetchApi();
  }, []);
  //   console.log(categories)
  const ctgs = categories.slice(0, 7);

  return (
    <div className={cx("cards-row" ,"wide")}>
      <div className={cx("row-header")}>
        <h3 className={cx("category-name")}>Bạn đang quan tâm gì?</h3>
      </div>

      <div className={cx("row-content")}>
        <div className={cx("topics-list")}>
          {ctgs.map((categ, index) => (
            <a href="" className={cx("row-topic")}>
              <div className={cx("intro")}>
                <div className={cx("heading-md")}>{categ.name}</div>
                <div className={cx("info")}>
                  Xem chủ đề <FontAwesomeIcon icon={faLeftRight} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FilmCategory;
