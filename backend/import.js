/* create recipes, specials tables and import the Crescendo JSON data 

https://jsonparser.org/  with URL 
https://bitbucket.org/crescendocollective/frontend-api-skills-test/raw/c69c3c10cbebb6ec1d9100182a836d9459159671/data.json

*/

const myknex = require("./db/knex");
const axios = require("axios");

let URL =
  "https://bitbucket.org/crescendocollective/frontend-api-skills-test/raw/c69c3c10cbebb6ec1d9100182a836d9459159671/data.json";

async function importDataWithAxios(httpurl) {
  try {
    const response = await axios.get(httpurl);

    let recipeCounter = 0;

    let Oobj = {};

    const new_recipesArray = [];
    const new_directionsArray = [];
    const new_imagesArray = [];
    const new_ingredientsArray = [];

    let thisCounter = 0;

    // console.log("*********************response.data.recipes - - ", response.data.recipes[0].images);
    for (let i = 0; i < response.data.recipes.length; i++) {
      const thisRecipe = response.data.recipes[i];
      //   console.log("---------thisRecipe----------");

      Object.keys(thisRecipe).forEach(function (key) {
        if (key == "ingredients") {
          let Iobj = {};

          //itterate over the ingredients array for this recipe
          for (let i = 0; i < thisRecipe.ingredients.length; i++) {
            //get each of the ingredients keys
            Object.keys(thisRecipe.ingredients[thisCounter]).forEach(function (
              ingredientskey
            ) {
              // now for this key - push into new_ingredientsArray for each item in the thisRecipe.ingredients[thisCounter] array

              // using "i" for the indes on the thisRecipe.ingredients array
              Iobj[ingredientskey] = thisRecipe.ingredients[i][ingredientskey];
            });

            //add the populated Iobj object as an array item into the new_ingredientsArray
            Iobj["recipeid"] = thisRecipe["uuid"];
            new_ingredientsArray.push([Iobj]);
            // clearing the Iobj object so that it dosn't append to.
            Iobj = {};
          }
          thisCounter = 0;
        } else if (key == "directions") {
          let Iobj = {};

          //itterate over the directions array for this recipe
          for (let i = 0; i < thisRecipe.directions.length; i++) {
            //get each of the directions keys
            Object.keys(thisRecipe.directions[thisCounter]).forEach(function (
              directionskey
            ) {
              // now for this key - push into new_directionsArray for each item in the thisRecipe.directions[thisCounter] array

              // using "i" for the indes on the thisRecipe.directions array
              Iobj[directionskey] = thisRecipe.directions[i][directionskey];
            });

            //add the populated Iobj object as an array item into the new_directionsArray
            Iobj["recipeid"] = thisRecipe["uuid"];
            new_directionsArray.push([Iobj]);
            // clearing the Iobj object so that it dosn't append to.
            Iobj = {};
          }
          thisCounter = 0;
        } else if (key == "images") {
          let Iobj = {};

          //get each of the images keys
          Object.keys(thisRecipe.images).forEach(function (imageskey) {
            // now for this key - push into new_imagesArray for each item in the thisRecipe.images array
            Iobj[imageskey] = thisRecipe.images[imageskey];
          });

          //add the populated Iobj object as an array item into the new_imagesArray
          Iobj["recipeid"] = thisRecipe["uuid"];
          new_imagesArray.push([Iobj]);
          // clearing the Iobj object so that it dosn't append to.
          Iobj = {};

          thisCounter = 0;
        } else {
          // push this key value into the Oobj
          Oobj[key] = thisRecipe[key];
        }
      });

      //add the populated Oobj object as an array item into the new_recipesArray
      new_recipesArray.push([Oobj]);
      // clearing the Oobj object so that it dosn't append to.
      Oobj = {};

      thisCounter++;

      // un comment to only hit the first recipe
      // break;
    }

    // console.log(new_recipesArray);
    // console.log(new_ingredientsArray);
    // console.log(new_directionsArray);
    insertDataIntoTable("directions", new_directionsArray);
    // console.log(new_imagesArray);
  } catch (err) {
    console.log("----------------------ERROR", err.message);
  }
}

// https://devhints.io/knex
// cheatsheet for knex

// https://www.sqlite.org/datatype3.html
// sqlite3 field types

// https://nodejs.dev/learn/modern-asynchronous-javascript-with-async-and-await

const dropTablesAsync = async () => {
  const tableName = "directions";
  try {
    await myknex.schema.hasTable(tableName).then(function (exists) {
      console.log("exists = ", exists);
      if (exists) {
        console.log(`${tableName} exists.. Deleting...`);
        myknex.schema.dropTable(tableName);
      } else {
        return;
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};

async function createRecipesTable() {
  try {
    const xx = myknex.schema.createTable("recipes", function (table) {
      table.increments("id");
      table.string("uuid");
      table.string("title");
      table.string("description");
      table.tinyint("servings");
      table.tinyint("prepTime");
      table.tinyint("cookTime");
      table.datetime("postDate", { precision: 6 }).defaultTo(myknex.fn.now(6));
      table.datetime("editDate", { precision: 6 }).defaultTo(myknex.fn.now(6));
    });
    // console.log(xx);
  } catch (err) {
    console.log("----------------------ERROR", err.message);
  }
}

async function createImagesTable() {
  try {
    const xx = myknex.schema.createTable("images", function (table) {
      table.increments("id");
      table.string("recipeId");
      table.string("full");
      table.string("medium");
      table.string("small");
    });
    // console.log(xx);
  } catch (err) {
    console.log("----------------------ERROR", err.message);
  }
}

async function createIngredientsTable() {
  try {
    const xx = myknex.schema.createTable("ingredients", function (table) {
      table.increments("id");
      table.string("recipeId");
      table.string("uuid");
      table.float("amount");
      table.string("measurement");
      table.string("name");
    });
    // console.log(xx);
  } catch (err) {
    console.log("----------------------ERROR", err.message);
  }
}

const createDirectionsTableAsync = async function () {
  const tableName = "directions";
  await myknex.schema.createTable(tableName, function (table) {
    table.increments("id").primary();
    table.string("recipeId", 255).notNullable();
    table.string("instructions", 255);
    table.boolean("optional");
  });
};


async function createSpecialsTable() {
  try {
    const xx = myknex.schema.createTable("specials", function (table) {
      table.increments("id");
      table.string("uuid");
      table.string("ingredientId");
      table.string("type");
      table.string("title");
      table.string("geo"); // just store the 43.032446,-87.908098 as a string for now
      table.string("text");
    });
    // console.log(xx);
  } catch (err) {
    console.log("----------------------ERROR", err.message);
  }
}

async function insertDataIntoTable(tablename, arrayOfData) {
  try {
    const xx = myknex(tablename)
      .insert(arrayOfData)
      .asCallback(function (err, rows) {
        if (err) return console.error(err);
        console.log("-----------------------", rows);
      });
    // console.log(xx);
  } catch (err) {
    console.log("----------------------ERROR", err.message);
  }
}

// tables

//    recipes
//        id int
//        uuid string
//        title string
//        description string
//        servings int
//        prepTime int
//        cookTime int
//        postDate string
//        editDate string

//    images
//        id int
//        full string
//        medium string
//        small string

//    ingredients
//        id int
//        recipesId int
//        uuid string
//        amountint
//        measurement string
//        name string

//    directions
//        id int
//        recipesId int
//        instructionsstring
//        optional bool

//    specials
//        id int
//        uuid string
//        ingredientId string
//        type string
//        title string
//        geo string -- just store the 43.032446,-87.908098 as a string for now
//        text string

//    users
//        id int
//        username string
//        password string
//        created_at string

// const json = [
//     {
//       id: "1",
//       msg: "hi",
//       tid: "2022-05-05 23:35",
//       fromWho: "hello1@email.cpm",
//     },
//     {
//       id: "2",
//       msg: "there",
//       tid: "2022-05-05 23:45",
//       fromWho: "hello2@email.cpm",
//     },
//   ];

//   for (const obj of json) {
//     console.log(obj.id);
//   }

// do these in order async await
// createRecipesTable();
// createImagesTable();
// createIngredientsTable();

// console.log('Before');
// createDirectionsTable();
// console.log('After');

console.log("Before dropTablesAsync");
const daaa = dropTablesAsync().then(function () {
  console.log("dropTablesAsync");
});
console.log("After dropTablesAsync");

// console.log("Before createDirectionsTableAsync");
// const dbbb = createDirectionsTableAsync()
//   .then(function() {
//     console.log("createDirectionsTableAsync");
//   });
// console.log("After createDirectionsTableAsync");

// console.log("Before createDirectionsTablePromise");
// const baaa = createDirectionsTablePromise()
//   .then(function(result) {
//     console.log(result); // "initResolve"
//     return "normalReturn";
//   })
//   .then(function(result) {
//     console.log(result); // "normalReturn"
//   });
// console.log("After createDirectionsTablePromise");

// createSpecialsTable();
// importDataWithAxios(URL);
