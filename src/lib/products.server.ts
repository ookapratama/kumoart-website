import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Product } from "./products";

const productsDirectory = path.join(process.cwd(), "content/products");

export function getAllProductsServer(): Product[] {
  if (!fs.existsSync(productsDirectory)) return [];

  const fileNames = fs.readdirSync(productsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(productsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      return { ...data, content } as Product;
    })
    .filter((p) => p.isActive);
}

export function getProductBySlugServer(slug: string): Product | undefined {
  return getAllProductsServer().find((p) => p.slug === slug);
}

export function getAllProductSlugsServer(): string[] {
  return getAllProductsServer().map((p) => p.slug);
}
