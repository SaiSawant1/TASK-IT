import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function customColorMap(bg: string | null): string {
  // Define the type of colorMap with specific keys and values
  let colorMap: { [key: string]: string } = {
    ff686b: "bg-pastel-red",
    a5ffd6: "bg-pastel-green",
    "749bd2": "bg-pastel-blue",
    ffd988: "bg-pastel-yellow",
    b388eb: "bg-pastel-violet",
  };

  // If bg is not provided or doesn't exist in colorMap, return a default value
  if (!bg || !(bg in colorMap)) {
    return "bg-white";
  }

  return colorMap[bg]; // Return the value corresponding to the bg key
}
