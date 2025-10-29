import { Link, useParams } from "react-router-dom";
import HeadlessTippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { useEffect, useState } from "react";
import { getCountry } from "~/services";
import "./NationList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function NationList() {
  const [post, setPost] = useState([]);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const result = await getCountry();
      setData(result.data.items);
    }
    fetchData();
  }, []);
  const handleClickOutSide = () => {
    setVisible(false)
  }

  // console.log("Data: ", visible);

  return (
    <>
      <div className="nation">
        <HeadlessTippy
          appendTo={() => document.body}
          visible={visible}
          interactive
          onClickOutside={handleClickOutSide}
          // placement="top-start"
          // trigger="click" không cần thằng này nữa vì đóng mở bằng onclick state rồi
          render={(attrs) => (
            <div className="box" tabIndex="-1" {...attrs}>
              <ul>
                {data.map((item, index) => (
                  <li key={index}>
                    <Link
                      onClick={() => setVisible(false)} // Vì thằng này chỉ có tắt thôi nên set là false
                      to={`quoc-gia/${item.slug}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        >
          <Link
            onClick={(e) => {
              e.preventDefault();
              setVisible(!visible); // thằng này phải bật tắt nên đảo ngược lại
            }}
            to=""

          >
            Quốc Gia<FontAwesomeIcon icon={faCaretDown} />
          </Link>
        </HeadlessTippy>
      </div>
    </>
  );
}

export default NationList;
