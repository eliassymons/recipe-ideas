"use client";

import Image from "next/image";
import IngredientForm from "./IngredientForm";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-center text-5xl mt-4">Recipe AI</h1>

      <IngredientForm />
    </div>
  );
}
