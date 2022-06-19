import React, { useState, useEffect } from "react"; //useEffect
import { Link } from "react-router-dom";
import axios from "axios";

function FetchCrescendoData() {
  const [dataCurrentState, setData] = useState([]);

  const fetchData = () => {
    const URL =
      "https://bitbucket.org/crescendocollective/frontend-api-skills-test/raw/c69c3c10cbebb6ec1d9100182a836d9459159671/data.json";
    axios.get(URL).then((response) => {
      // console.log(response.data);
      setData(response.data, (response.dataloading = false));
      // dataIsLoading = false;
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

  useEffect(() => {
    fetchData();
  }, []);

  const listView = (dataHere) => {
    // console.log(dataHere);
    let row = [];

    // console.log(dataHere.recipes);
    if (dataHere.recipes) {
      for (let i = 0; i < dataHere.recipes.length; i++) {
        const thisRecipe = dataHere.recipes[i];
        const recipeImage =
          "https://bitbucket.org/crescendocollective/frontend-api-skills-test/raw/c69c3c10cbebb6ec1d9100182a836d9459159671/public" +
          thisRecipe.images.medium;

        row.push(
          <div key={i}>
            <div className="container mx-auto">
              <div className="flex flex-wrap">
                <div>
                  <div className="text-left">
                    <h1 className="text-gray-900 font-bold">
                      {thisRecipe.title}
                    </h1>
                  </div>
                  <div>
                    <Link
                      to={`/detail/${thisRecipe.uuid}`}
                      state={dataCurrentState}
                    >
                      <img
                        alt="John Doe"
                        src={recipeImage}
                        className="rounded-xl shadow-lg max-w-full h-auto align-middle border-none undefined"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    return row;
  };


  const specialsView = (dataHere) => {
    let row = [];

    if (dataHere.specials) {

      for (let i = 0; i < dataHere.specials.length; i++) {
        const thisSpecial = dataHere.specials[i];


        row.push(


          <div key={i}>
            <div className="container mx-auto">
              <div className="flex flex-wrap">
                <div>
                  <div className="text-left">
                    <h1 className="text-gray-900 font-bold">
                      {thisSpecial.title}
                    </h1>
                  </div>
                  <div>
                  type: {thisSpecial.type}<br />
                  geo: {thisSpecial.geo}<br />
                  text: {thisSpecial.text}<br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );




      }

    }

    return row;

  }

  return (
    <div>
      <button onClick={fetchData} className="btn btn-primary">
        Refresh Data
      </button>
      {
        // console.log(dataCurrentState)
        listView(dataCurrentState)
      }


<br /><br />
<h1 className="text-gray-900 font-bold">Specials</h1>
      {
        specialsView(dataCurrentState)
      }
    </div>
  );
}

export default FetchCrescendoData;
