import { useState } from "react";

import { Plus, Trash2, X } from "lucide-react";

import toast from "react-hot-toast";

import {
useProducts
}
from "../../context/ProductContext";

import {
  createProduct,
  deleteProduct,
  updateProduct
} from "../../services/productService";

export default function AdminProducts() {

const {

products,
fetchProducts

}
=
useProducts();

const [showModal,setShowModal]=
useState(false);

const [editingId,setEditingId] = useState(null);

const [form,setForm]=
useState({
inStock:true,
name:"",
price:"",
originalPrice:"",

description:"",

category:"",
collections:"",
material:"",
occasion:"",

image:"",

gallery:["","",""],

features:["","",""],

specifications:["","",""],

highlights:[
{
title:"Free Delivery",
icon:"truck"
},
{
title:"Certified",
icon:"shield"
},
{
title:"Easy Return",
icon:"return"
}
]

});


// INPUT CHANGE

const handleChange=(field,value)=>{

setForm(prev=>({

...prev,

[field]:value

}));

};



// ARRAY CHANGE

const handleArrayChange=(
field,
index,
value
)=>{

const updated=[
...form[field]
];

updated[index]=value;

setForm(prev=>({

...prev,

[field]:updated

}));

};




// SAVE PRODUCT

const handleSave = async()=>{

if(
!form.name ||
!form.price ||
!form.image
){
toast.error("Fill required fields");
return;
}

const productData={
inStock: form.inStock,
id: editingId || Date.now(),

...form,

price:Number(form.price),

originalPrice:Number(form.originalPrice),

slug:form.name
.toLowerCase()
.replaceAll(" ","-")

};

try{

if(editingId){

await updateProduct(
editingId,
productData
);

toast.success("Updated ✨");

}
else{

await createProduct(
productData
);

toast.success("Product Added ✨");

}

await fetchProducts();

setEditingId(null);

setShowModal(false);

}
catch{

toast.error("Operation failed");

}

};

const handleDelete = async(id)=>{

try{

await deleteProduct(id);

await fetchProducts();

toast.success("Deleted 🗑️");

}

catch{

toast.error("Delete failed");

}

};

const handleEdit=(item)=>{

setForm({
inStock:item.inStock ?? true,
name:item.name || "",
price:item.price || "",
originalPrice:item.originalPrice || "",
description:item.description || "",

category:item.category || "",
collections:item.collections || "",
material:item.material || "",
occasion:item.occasion || "",

image:item.image || "",

gallery:item.gallery || ["","",""],
features:item.features || ["","",""],
specifications:item.specifications || ["","",""],

highlights:item.highlights || []

});

setEditingId(item.id);

setShowModal(true);

};

const [search,setSearch]=
useState("");

const categories = [
  "necklace-sets",
  "pendant-sets",
  "earring-designs",
  "bangles",
  "long-necklace-sets",
  "rings",
  "hair-accessories",
  "waistbands",
  "mangalsutra"
];

const [selectedCategory,setSelectedCategory]=
useState("all");


const filteredProducts =

products.filter((item)=>{

const searchTerm=

search
.trim()
.toLowerCase();

const searchableText=

`
${item.name || ""}
${item.category || ""}
${item.collections || ""}
${item.material || ""}
${item.occasion || ""}
`

.toLowerCase();


const matchesSearch=

searchTerm===""

?

true

:

searchableText.includes(
searchTerm
);


const matchesCategory=

selectedCategory==="all"

||

item.category===
selectedCategory;


return(

matchesSearch
&&
matchesCategory

);

});


return(

<div>

{/* HEADER */}

<div
className="
flex
flex-col
sm:flex-row
gap-4
sm:gap-0
justify-between
sm:items-center
mb-8
"
>

<h1
className="
text-3xl
font-bold
text-[#5f4712]
"
>
Products
</h1>

<button
onClick={()=>
setShowModal(true)
}
className="
w-full
sm:w-auto
px-5
h-12
rounded-2xl
bg-[#c8a24b]
text-white
flex
justify-center
items-center
gap-2
"
>

<Plus size={18}/>

Add Product

</button>

</div>





{/* TOP ACTIONS */}

<div
className="
flex
flex-col
md:flex-row
gap-4
mb-6
"
>

<input
placeholder="Search products, category..."

value={search}

onChange={(e)=>

setSearch(
e.target.value
)

}

className="
w-full
md:flex-1
h-[52px]
px-5
rounded-2xl
border
border-[#ecd8a5]
bg-white
outline-none
"
/>


<select

value={selectedCategory}

onChange={(e)=>

setSelectedCategory(
e.target.value
)

}

className="
w-full
md:w-[250px]
h-[52px]
px-4
rounded-2xl
border
border-[#ecd8a5]
bg-white
"

>

<option value="all">

All Categories

</option>

{
categories.map((cat)=>(

<option
key={cat}
value={cat}
>
{cat}
</option>

))
}

</select>

</div>



{/* TABLE */}


<div
className="
bg-white
rounded-[25px]
sm:rounded-[35px]

border
border-[#ecd8a5]

overflow-x-auto
w-full

shadow-[0_10px_30px_rgba(200,162,75,.08)]

scrollbar-thin
"
>

<table
className="
w-full
min-w-[850px]
"
>

<thead>

<tr
className="
bg-[#fff7e8]
"
>

<th className="p-5">
Image
</th>

<th>
Name
</th>

<th>
Category
</th>

<th>
Collection
</th>

<th>
Price
</th>

<th>
Actions
</th>

</tr>

</thead>


<tbody>

{

filteredProducts.map(

item=>(

<tr
key={item.id}

className="
border-t
hover:bg-[#fffdf7]
transition
"
>

<td className="p-4">

<img

src={
item.image
}

className="
w-[60px]
h-[60px]
rounded-2xl
object-cover
border
border-[#ecd8a5]
"
/>

</td>


<td
className="
font-medium
"
>

{
item.name
}

</td>

<td>

{
item.category
}

</td>

<td>

{
item.collections
}

</td>

<td
className="
font-bold
text-[#c8a24b]
"
>

₹
{
item.price
}

</td>


<td>

<div
className="
flex
gap-4
"
>

<button
onClick={()=>handleEdit(item)}
className="
text-blue-500
hover:scale-110
transition
"
>
✏️
</button>

<button
onClick={()=>handleDelete(item.id)}
className="
text-red-500
hover:scale-110
transition
"
>
🗑️
</button>

</div>

</td>

</tr>

)

)

}

</tbody>

</table>

</div>



{/* MODAL */}


{showModal && (

<div
className="
fixed
inset-0
bg-black/40
z-50

flex
justify-center
items-center
p-4
"
>

<div
className="
bg-white
w-full
max-w-[850px]

rounded-[20px]
sm:rounded-[30px]

p-4
sm:p-6

max-h-[90vh]
overflow-y-auto
"
>

<div
className="
flex
justify-between
items-center
mb-6
"
>

<h2
className="
text-xl
sm:text-3xl
font-bold
"
>
{editingId ? "Edit Product" : "Add Product"}
</h2>

<button
onClick={()=>{
setShowModal(false);
setEditingId(null);
}}

className="
w-10
h-10
rounded-full
bg-gray-100
hover:bg-red-100
flex
items-center
justify-center
transition
"
>

<X size={20}/>

</button>

</div>


<div
className="
grid
md:grid-cols-2
gap-5
"
>

<input
placeholder="Product Name"
value={form.name}
onChange={(e)=>
handleChange(
"name",
e.target.value
)
}
className="border p-4 rounded-xl"
/>

<input
placeholder="Price"
value={form.price}
onChange={(e)=>
handleChange(
"price",
e.target.value
)
}
className="border
p-3
sm:p-4
rounded-xl
w-full"
/>

<input
placeholder="Original Price"
value={form.originalPrice}
onChange={(e)=>
handleChange(
"originalPrice",
e.target.value
)
}
className="border p-4 rounded-xl"
/>

<select

value={form.category}

onChange={(e)=>

handleChange(
"category",
e.target.value
)

}

className="
border
p-4
rounded-xl
"

>

<option value="">
Select Category
</option>

<option value="necklace-sets">
Necklace
</option>

<option value="pendant-sets">
Pendant
</option>

<option value="earring-designs">
Earrings
</option>

<option value="bangles">
Bangles
</option>

<option value="long-necklace-sets">
Long Sets
</option>

<option value="rings">
Rings
</option>

<option value="hair-accessories">
Hair Accessories
</option>

<option value="waistbands">
Waistbands
</option>

<option value="mangalsutra">
Mangalsutra
</option>

</select>

<select
value={form.inStock}
onChange={(e)=>
handleChange(
"inStock",
e.target.value === "true"
)
}
className="
border
p-4
rounded-xl
"
>
<option value="true">
In Stock
</option>

<option value="false">
Out Of Stock
</option>

</select>

<select

value={form.collections}

onChange={(e)=>

handleChange(
"collections",
e.target.value
)

}

className="
border
p-4
rounded-xl
"

>

<option value="">
Select Collection
</option>

<option value="Mens">
Mens
</option>

<option value="Womens">
Womens
</option>

<option value="Kids">
Kids
</option>

</select>
<select
value={form.material}
onChange={(e)=>
handleChange(
"material",
e.target.value
)
}
className="
border
p-4
rounded-xl
"
>

<option value="">
Select Material
</option>

<option value="Kundan">
Kundan
</option>

<option value="Alloy & Stone">
Alloy & Stone
</option>

<option value="Pearl">
Pearl
</option>

</select>

<select
value={form.occasion}
onChange={(e)=>
handleChange(
"occasion",
e.target.value
)
}
className="
border
p-4
rounded-xl
"
>

<option value="">
Select Occasion
</option>

<option value="Wedding">
Wedding
</option>

<option value="Bridal">
Bridal
</option>

<option value="Party Wear">
Party Wear
</option>

</select>

<input
placeholder="Main Image Url"
value={form.image}
onChange={(e)=>
handleChange(
"image",
e.target.value
)
}
className="border p-4 rounded-xl"
/>

</div>


<textarea
placeholder="Description"
value={form.description}
onChange={(e)=>
handleChange(
"description",
e.target.value
)
}
className="
w-full
border
rounded-xl
p-4
mt-5
h-[120px]
"
/>


<h3 className="mt-6 font-bold">
Gallery Images
</h3>

<div
className="
grid
md:grid-cols-3
gap-4
mt-3
"
>

{form.gallery.map(
(item,index)=>(

<input
key={index}

placeholder={`Image ${index+1}`}

value={item}

onChange={(e)=>

handleArrayChange(
"gallery",
index,
e.target.value
)

}

className="
border
p-4
rounded-xl
"
/>

)

)}

</div>



<h3 className="mt-6 font-bold">
Features
</h3>

<div className="space-y-3 mt-3">

{form.features.map(
(item,index)=>(

<input
key={index}

value={item}

placeholder={`Feature ${index+1}`}

onChange={(e)=>

handleArrayChange(
"features",
index,
e.target.value
)

}

className="
w-full
border
p-4
rounded-xl
"
/>

)

)}

</div>


<h3 className="mt-6 font-bold">
Specifications
</h3>

<div className="space-y-3 mt-3">

{form.specifications.map(
(item,index)=>(

<input
key={index}

value={item}

placeholder={`Specification ${index+1}`}

onChange={(e)=>

handleArrayChange(
"specifications",
index,
e.target.value
)

}

className="
w-full
border
p-4
rounded-xl
"
/>

)

)}

</div>



<button
onClick={handleSave}
className="
w-full
h-14
rounded-2xl
mt-8

bg-gradient-to-r
from-[#c8a24b]
to-[#d4b044]

text-white
font-medium
"
>

Save Product

</button>

</div>

</div>

)}

</div>

)

}