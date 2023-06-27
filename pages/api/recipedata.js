import openai from "../../app/utils/openai";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { ingredients } = req.body;

    // Handle the POST request for ingredients
    // Process the ingredients data as needed
    // ...
    // Generate recipe options

    // Generate the recipe idea using ChatGPT
    const prompt = `These are my ingredients: ${ingredients.join(
      ", "
    )}. Generate a recipe for a main dish based on the given ingredients. You can add other ingredients that I didn't include in order to make a more developed recipe, as long as my ingredients are included. You don't have to include all the ingredients I provide in the title. The response should be in the following format:
    {
      "title": "Recipe Title",
      "ingredients": [
        {
          "name": "Ingredient 1",
          "amount": "Amount 1"
        },
        {
          "name": "Ingredient 2",
          "amount": "Amount 2"
        },
        ...
      ],
      "description": "recipe description",
      "method": [
        {
          "1": "Step 1"
        },
        {
          "2": "Step 2"
        },
        ...
      ]
    }`;

    try {
      const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt,
        max_tokens: 2000,
        temperature: 1,
      });

      const responseText = completion.data.choices[0];
      res.status(200).json(responseText);
    } catch (error) {
      console.error("Error generating recipe idea:", error);
      res.status(500).json({ message: "Failed to generate recipe idea" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
