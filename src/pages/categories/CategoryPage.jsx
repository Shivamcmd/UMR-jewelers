import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Filter, ArrowUpDown, X } from "lucide-react";
import { useLocation } from "react-router-dom";

import TopCategories from "./TopCategories";
import FiltersSidebar from "./FiltersSidebar";
import ProductGrid from "./ProductGrid";
import FAQSection from "../../components/faqsection";

import {
useProducts
}
from "../../context/ProductContext";

export default function CategoryPage() {
  const location = useLocation();
  const { slug } = useParams();
const [showFilters, setShowFilters] = useState(false);
const [sortBy, setSortBy] = useState("");
  const [products, setProducts] = useState([]);
const [filters, setFilters] = useState({
  collections:"",
  price: 50000,
  material: "",
  occasion: "",
  rating: 0,
});

useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}, [slug]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
  const params = new URLSearchParams(
    location.search
  );

  const collection =
    params.get("collection");

  if (collection) {
    setFilters((prev) => ({
      ...prev,
      collections: collection,
    }));

    setTimeout(() => {
      document
        .getElementById("products-section")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 300);
  }
}, [location.search]);

const filteredProducts = products
.filter((item) => {

const matchCategory =
slug === "all" ||
item.category?.toLowerCase() === slug?.toLowerCase();

const matchPrice =
item.price <= filters.price;

const matchMaterial =
!filters.material ||
item.material === filters.material;

const matchOccasion =
!filters.occasion ||
item.occasion === filters.occasion;

const matchRating =
!filters.rating ||
item.rating >= filters.rating;

const matchCollections =
!filters.collections ||
item.collections === filters.collections;

return (
matchCategory &&
matchCollections &&
matchPrice &&
matchMaterial &&
matchOccasion &&
matchRating
);

})

.sort((a,b)=>{

if(sortBy==="low")
return a.price-b.price;

if(sortBy==="high")
return b.price-a.price;

if(sortBy==="rating")
return b.rating-a.rating;

return 0;

});

  return (
    <>
      <div className="w-full bg-[#fbf7ef] min-h-screen">

      {/* TOP CATEGORIES */}
<div className="bg-[#fbf7ef] border-b border-[#e6d3a7]">
        <div className="px-3 md:px-5 py-3">
          <TopCategories />
        </div>
      </div>

     {/* MAIN LAYOUT */}
<div
  className="
  max-w-screen-2xl
  mx-auto
  flex
  gap-3 md:gap-6
  px-1 sm:px-3 md:px-6
  py-3 md:py-5"
>

  {/* LEFT FILTER SIDEBAR */}
  <aside
    className="hidden lg:block
    w-[290px] shrink-0"
  >
    <div className="sticky top-[125px]">
      <div className="bg-white border border-[#ead7ad] rounded-2xl shadow-[0_4px_20px_rgba(212,175,55,0.10)]">
        <FiltersSidebar
  filters={filters}
  setFilters={setFilters}
/>
      </div>
    </div>
  </aside>

  {/* RIGHT PRODUCT SECTION */}
  <main className="flex-1 overflow-hidden min-w-0">
{/* MOBILE FILTER/SORT */}

<div
  className="
  lg:hidden
  flex
  gap-3
  mb-4
  w-full
  min-w-0
  "
>

<button
onClick={()=>setShowFilters(true)}
className="
flex-1
min-w-0
bg-white
border border-[#e4c777]
rounded-lg
py-2
px-2
flex
items-center
justify-center
gap-1.5
font-medium
text-[14px]
text-[#8b6b1d]
shadow-sm
"
>
<Filter size={16}/>
Filters
</button>


<div className="flex-1 min-w-0 relative">

<select
value={sortBy}
onChange={(e)=>setSortBy(e.target.value)}
className="
w-full
min-w-0
appearance-none
bg-white
border border-[#e4c777]
rounded-lg
px-3
py-2
pr-8
text-[14px]
text-[#8b6b1d]
shadow-sm
"
>
<option value="">Sort By</option>
<option value="low">Price: Low → High</option>
<option value="high">Price: High → Low</option>
<option value="rating">Top Rated</option>
</select>

<ArrowUpDown
size={14}
className="
absolute
right-3
top-1/2
-translate-y-1/2
pointer-events-none
text-[#8b6b1d]
"
/>

</div>

</div>
    <ProductGrid products={filteredProducts} />
    {/* MOBILE FILTER MODAL */}

{
showFilters && (

<div
className="
fixed
inset-0
z-50
bg-black/40
lg:hidden
"
>

<div
className="
absolute
bottom-0
left-0
right-0
bg-[#fffdf8]
rounded-t-[30px]
pt-2
max-h-[90vh]
flex
flex-col
overflow-hidden
animate-slideUp
"
>

{/* HEADER */}

<div
className="
sticky
top-0
z-10
bg-[#fffdf8]
px-5
pt-4
pb-3
border-b
border-[#ead7ad]
flex
items-center
justify-between
"
>

<h2
className="
font-bold
text-[24px]
text-[#8b6b1d]
"
>
Filters
</h2>

<button
onClick={()=>setShowFilters(false)}
className="
w-10
h-10
rounded-full
flex
items-center
justify-center
hover:bg-[#f6efd8]
shrink-0
"
>

<X size={24}/>

</button>

</div>

{/* FILTER CONTENT */}

<div
className="
flex-1
overflow-y-auto
px-4
py-3
"
>

<FiltersSidebar
filters={filters}
setFilters={setFilters}
/>

</div>

{/* APPLY BUTTON */}

<div
className="
sticky
bottom-0
bg-[#fffdf8]
p-4
border-t
border-[#ead7ad]
"
>

<button
onClick={()=>setShowFilters(false)}
className="
w-full
bg-[#c89b2c]
text-white
py-3
rounded-xl
font-medium
"
>

Apply Filters

</button>

</div>

</div>

</div>

)
}

  </main>

</div>
<FAQSection/>
    </div>
    </>
  
  );
}