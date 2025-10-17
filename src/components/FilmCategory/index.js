import { useState, useEffect } from "react";
import { getCategory } from "~/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftRight } from "@fortawesome/free-solid-svg-icons";

function FilmCategory() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
        const result = await getCategory()
        setCategories(result.items)
    }
    fetchApi();
  }, []);
//   console.log(categories)
  const ctgs = categories.slice(0,7)

  return (
    <div className="cards-row wide">
      <div className="row-header">
        <h3 className="category-name">Bạn đang quan tâm gì?</h3>
      </div>

      <div className="row-content">
        
        <div className="topics-list">
            {
                ctgs.map((categ, index)=>(

          <a href="" className="row-topic">
            <div className="intro">
              <div className="heading-md">{categ.name}</div>
              <div className="info">Xem chủ đề <FontAwesomeIcon icon={faLeftRight}/></div>
            </div>
          </a>
                ))
            }
          
        </div>
      </div>
    </div>
  );
}

export default FilmCategory;
