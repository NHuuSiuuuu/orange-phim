import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faSpinner } from "@fortawesome/free-solid-svg-icons";
import HeadlessTippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { useEffect, useRef, useState } from "react";
import useDebounce from "~/hooks/useDebounce";
import "./Search.scss";
import { search } from "~/services";

function Search() {
  const inputRef = useRef();
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);
  const imageBase = "https://img.ophim.live/uploads/movies/";

  // Khi người dùng ngừng gõ 500ms thì debounceValue mới nhận giá trị mới searchValue
  const debounceValue = useDebounce(searchValue, 500);

  useEffect(() => {
    // Nếu ban đầu có khoảng trắng thì không làm gì
    if (!debounceValue.trim()) {
      setSearchResult([]);
      return;
    }
    const fetchApi = async () => {
    setLoading(true)
    const result = await search(debounceValue)
    setSearchResult(result.data.items)

      setLoading(false);
    }

    fetchApi();
  }, [debounceValue]);
  console.log("Kết quả tìm kiếm: ", searchResult);

  const handleOnChange = (e) => {
    setSearchValue(e.target.value);
  };
  console.log("Nhập: ", debounceValue);

  const handleHideResult = () => {
    setShowResult(false);
  };
  const handleClear = () => {
    setShowResult(false);
    setSearchValue("");
    setSearchResult([]);
    inputRef.current.focus();
  };
  console.log("Hiển thị kết quả:", showResult);
  console.log("Loading: ", loading);
  return (
    <div>
      <HeadlessTippy
        appendTo={() => document.body}
        interactive
        visible={searchResult.length > 0}
        placement="top-start"
        // offset={[0, 0]} // Dịch tooltip 10px sang phải, 5px xuống
        render={(attrs) => (
          <div className="search-result" tabIndex="-1" {...attrs}>
            <div className="search-modal">
              <div className="show-group">
                <div className="group-title">Danh sách phim</div>
                <div className="group-list">
                  {searchResult.map((rs, index) => (
                    <a href="" className="h-item" key={index}>
                      <div className="thumb">
                        <img src={imageBase + rs.thumb_url} alt="" />
                      </div>

                      <div className="info">
                        <div className="item-title">
                          <h4>{rs.name}</h4>
                        </div>
                        <div className="alias-title">{rs.origin_name}</div>
                        <div className="alias-title">2024</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className="search">
          <input
            ref={inputRef}
            type="text"
            placeholder="Tìm kiếm phim"
            value={searchValue}
            onChange={handleOnChange}
            spellCheck={false}
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && !loading && (
            <button className="clear" onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}
          {loading && (
            <button className="loading">
              <FontAwesomeIcon icon={faSpinner} />
            </button>
          )}
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
