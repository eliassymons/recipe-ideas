function Recipe(props) {
  console.log("Ingredients:", props.ingredients);
  return (
    <div className="flex flex-col space-y-4 py-10  px-6 py-2 mt-2 pb-8">
      <h2 className="text-2xl font-bold text-center md:text-3xl ">
        {props.title}
      </h2>
      <p className="md:text-xl">{props.description}</p>
      <ul className="list-none  mx-auto  w-full py-4 font-bold space-y-3 md:text-xl">
        {props.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.amount} {ingredient.name}
          </li>
        ))}
      </ul>
      <h3 className="text-center text-xl font-bold md:text-2xl">
        Instructions
      </h3>
      <ol className="space-y-4 md:text-xl">
        {props.method.map((step) => {
          const stepNumber = Object.keys(step)[0];
          const stepDescription = step[stepNumber];
          return (
            <li
              className="py-1 flex justify-start items-start flex-col"
              key={stepNumber}
            >
              <div className="font-bold ">Step {stepNumber} </div>
              {stepDescription}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default Recipe;
