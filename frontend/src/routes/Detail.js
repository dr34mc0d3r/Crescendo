import React from "react";
import {
  // BrowserRouter as Router,
  // Link,
  // Route,
  // Routes,
  useParams,
  useLocation,
} from "react-router-dom";

function Detail() {
  const location = useLocation();
  const data = location.state;

  const { id } = useParams();
  const detailHTMLArray = [];

  const directions = (recipe) => {
    let directions = [];
    const directionsArray = recipe.directions;

    for (let ii = 0; ii < directionsArray.length; ii++) {
      let inst = directionsArray[ii].instructions;
      directions.push({ind: ii, inst});
    }

    return directions;
  };

  const ingredients = (recipe) => {
    let ingredients = [];
    const ingredientsArray = recipe.ingredients;
    // console.log(ingredientsArray);

    for (let ii = 0; ii < ingredientsArray.length; ii++) {
      ingredients.push({ind: ii, name: ingredientsArray[ii].name, measurement: ingredientsArray[ii].measurement, amount: ingredientsArray[ii].amount});
    }
    return ingredients;
  };

  const showme = () => {
    for (let i = 0; i < data.recipes.length; i++) {
      if (data.recipes[i].uuid === id) {
        // console.log(data.recipes[i]);

        detailHTMLArray.push(
          <div key={i}>
            {data.recipes[i].title}
            <br />
            Cook Time: {data.recipes[i].cookTime}
            <br />
            Description: <br />
            {data.recipes[i].description}
            <br />
            <br />
            Directions:
            <br />
            {directions(data.recipes[i]).map((name) => (
              <div key={"dir" + name.ind}>{name.inst}</div>
            ))}
            <br />
            <br />
            Ingredients:
            <br />
            {ingredients(data.recipes[i]).map((data) => (
              <div key={"ing" + data.ind}>
                {data.name}
                {data.measurement}
                {data.amount}
              </div>
            
            ))}
            <br />
            <br />
            Prep Time: {data.recipes[i].prepTime}
            <br />
            Servings: {data.recipes[i].servings}
            <br />
            <br />
          </div>
        );
      }
    }

    return detailHTMLArray;
  };

  return (
    <>
      <div>Detail</div>
      {showme()}
    </>
  );
}

export default Detail;
