function Recipe(props) {
  console.log("Ingredients:", props.ingredients);
  return (
    <div className="flex flex-col space-y-4 py-10">
      <h2 className="text-xl font-bold text-center mt-4">{props.title}</h2>
      <p>{props.description}</p>
      <ul className="list-none mx-auto bg-blue-200 w-full py-4 pl-8">
        {props.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.amount} {ingredient.name}
          </li>
        ))}
      </ul>
      <h3 className="text-center font-bold">Instructions</h3>
      <ol>
        {props.method.map((step) => {
          const stepNumber = Object.keys(step)[0];
          const stepDescription = step[stepNumber];
          return (
            <li
              className="py-1 flex justify-start items-start"
              key={stepNumber}
            >
              <div className="bg-slate-800 text-white flex items-center justify-center rounded-full mr-4  h-[1.5rem] min-w-[1.5rem]">
                {stepNumber}{" "}
              </div>
              {stepDescription}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default Recipe;
