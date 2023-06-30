// components/IngredientForm.js
import React, { useState } from "react";
import Recipe from "./components/Recipe";
import { NewtonsCradle } from "@uiball/loaders";

function IngredientForm() {
  const [ingredients, setIngredients] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [recipe, setRecipe] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddIngredient = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== "") {
      setIngredients((prevIngredients) => [...prevIngredients, inputValue]);
      setInputValue("");
    }
  };

  const handleDeleteIngredients = (event) => {
    event.preventDefault();
    setIngredients([]);
  };
  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    if (ingredients.length > 0) {
      try {
        const requestData = { ingredients };
        console.log("Request Data:", requestData); // Log the request data
        const response = await fetch("/api/recipedata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ingredients }),
        });

        if (response.ok) {
          const data = await response.json();

          console.log(data);

          setRecipe(JSON.parse(data.text));
          setSubmitted(true);
          setIsLoading(false);
          // setIngredients([]);
          // setRecipe({}); // Process the received recipe idea
        } else {
          console.error("Failed to fetch recipe idea:");
        }
      } catch (error) {
        console.error("Error sending ingredients to backend:", error);
        // Handle error
      }
    }
  };
  const handleClear = (e) => {
    e.preventDefault();
    setRecipe({});
    setIngredients([]);
    setSubmitted(false);
  };
  console.log(isLoading);
  return (
    <div className="w-[90%] mx-auto  flex flex-col items-center sm:w-[80%] md:w-[70%] lg:w-[42%]">
      {" "}
      {ingredients.length === 0 && (
        <h2 className="text-xl">What's in your pantry?</h2>
      )}
      <ul className="gap-[.2rem] text-center mt-10 md:text-xl flex space-x-1 mb-4 flex-wrap items-center justify-center w-[80%] max-w-[22rem] ">
        {ingredients.map((ingredient, index) => (
          <li className="text-md bg-gray-200 px-2 rounded-full  " key={index}>
            {ingredient}
          </li>
        ))}
      </ul>
      {Object.keys(recipe).length === 0 && !isLoading && (
        <form
          onSubmit={handleAddIngredient}
          className="flex max-w-[80%] items-center justify-center space-x-4 relative "
        >
          <input
            className="outline outline-1 outline-slate-300 rounded-md py-2 px-4 text-center md:text-xl focus:outline-2 max-w-[100%]"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          {inputValue.length > 0 && (
            <button
              type="submit"
              className="absolute flex justify-center items-center right-2 rounded-full h-6 w-6 text-xl text-white mx-auto bg-green-400 hover:bg-blue-200 active:bg-green-600"
            >
              +
            </button>
          )}
        </form>
      )}
      {ingredients.length > 0 && !isLoading && (
        <button className=" mt-6 " onClick={handleSubmit}>
          {!submitted ? (
            <div className="p-2 rounded-full bg-green-500 fixed  right-4 bottom-40 sm:static group hover:bg-green-600 ">
              <img
                src="/upload.svg"
                alt="submit"
                className="w-8 bg-green-500  rounded-full md:w-10 group-hover:bg-green-600 "
              />
            </div>
          ) : (
            <div className="p-2 rounded-full bg-green-500 opacity-80 hover:opacity-100  fixed right-4 bottom-20 lg:right-[25%] lg:bottom-[42%]">
              <img
                src="/redo.svg"
                alt="redo"
                className="w-8  rounded-full md:w-10"
              />
            </div>
          )}
        </button>
      )}
      {ingredients.length > 0 &&
        Object.keys(recipe).length === 0 &&
        !isLoading && (
          <button className="  mt-4  " onClick={handleDeleteIngredients}>
            <div className="p-2 rounded-full bg-red-500 absolute right-4 bottom-20 sm:static group hover:bg-red-600">
              <img
                src="/remove.svg"
                alt="remove"
                className="w-8 bg-red-500 rounded-full md:w-10  group-hover:bg-red-600"
              />
            </div>
          </button>
        )}
      {isLoading && (
        <div className="mt-8 flex flex-col items-center text-slate-600">
          <h3 className="text-xl md:text-2xl font-bold">
            Consulting the chef...
          </h3>
          <NewtonsCradle size={70} color="grey" lineWeight={2} />
        </div>
      )}
      {Object.keys(recipe).length > 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center">
          <button className="   mt-4   " onClick={handleClear}>
            <div className=" rounded-full opacity-80 hover:opacity-100 fixed right-4 bottom-40 lg:right-[25%] lg:bottom-[50%]">
              <img
                src="/clear.svg"
                alt="clear"
                className="w-12  rounded-full md:w-14 "
              />
            </div>
          </button>
          <Recipe
            title={recipe.title}
            ingredients={recipe.ingredients}
            method={recipe.method}
            description={recipe.description}
          />
        </div>
      )}
    </div>
  );
}

export default IngredientForm;
