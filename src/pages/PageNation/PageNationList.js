import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getFilms } from "~/services";
function PageNationList() {
      const [data, setData] = useState([]);
     
       useEffect(() => {
        async function fetchData() {
         const result = await getFilms();
         setData(result.data.items)
        }
        fetchData();
       }, []);
     
       console.log('Data: ',data);
     
    return <div style={{  padding:'50px' }}>
      <h3>Danh sách lọc theo nước</h3>
      <ul>
        {data.map((item)=>(
          <li key={item._id} >
            <Link to={"/quoc-gia/" + item.slug}> {item.name} </Link>
          </li>
        ))}
 
      </ul>
  </div>; 
}

export default PageNationList;