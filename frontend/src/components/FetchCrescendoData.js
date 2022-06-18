import React, { useState } from "react"; //useEffect
import { Link } from "react-router-dom";
import axios from "axios";

function FetchCrescendoData() {
  const [dataCurrentState, setData] = useState([]);

  const fetchData = () => {
    const URL =
      "https://bitbucket.org/crescendocollective/frontend-api-skills-test/raw/c69c3c10cbebb6ec1d9100182a836d9459159671/data.json";
    axios.get(URL).then((response) => {
      console.log(response.data);
      //   response.data.result;
      setData(response.data, (response.dataloading = false));
    });
  };

  //   const fetchData = () => {
  //     try {
  //       fetch(URL)
  //         .then((res) => {
  //             res.json();
  //           console.log(res);
  //           setData(res.data);
  //         });
  //     } catch (err) {
  //       console.log("err: ", err);
  //     }
  //   };

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  const listView = (dataHere) => {
    const row = [];
    // console.log(dataHere.recipes);
    if (dataHere.recipes) {
      for (let i = 0; i < dataHere.recipes.length; i++) {
        const thisRecipe = dataHere.recipes[i];
        row.push(
            <div key={i}>{thisRecipe.title}<br />
            <Link to="/detail" state={dataCurrentState}>{thisRecipe.uuid}</Link>
            </div>
        );
      }
    }

    return row;
  };

  return (
    <div>
      <button onClick={fetchData} className="btn btn-primary">
        Fetch Data
      </button>
      {
        // console.log(dataCurrentState)
        listView(dataCurrentState)
      }
    </div>
  );
}

export default FetchCrescendoData;
