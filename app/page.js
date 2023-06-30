"use client";

import { Geologica } from "next/font/google";

import IngredientForm from "./IngredientForm";
import Link from "next/link";

const geo = Geologica({ subsets: ["latin"], weight: ["600"] });

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1
        className={`text-center text-5xl md:text-6xl mt-8 font-black mb-4 ${geo.className}`}
      >
        Chef<span className="text-green-500">AI</span>
      </h1>

      <IngredientForm />
    </div>
  );
}
