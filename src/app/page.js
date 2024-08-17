import { getProducts } from "@/api/getProducts";
import ProductList from "@/components/ProductList";

export default async function Home() {
    const products=await getProducts()

  return (
      <ProductList products={products}/>
  );
}
