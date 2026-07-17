import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  return (
    <div
      id="products-section"
      className="
      grid
      grid-cols-2
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-3
      xl:grid-cols-4
      gap-2
      md:gap-5
      w-full
      "
    >
      {products.map((item) => (
        <div key={item.id}>
          <ProductCard item={item} />
        </div>
      ))}
    </div>
  );
}