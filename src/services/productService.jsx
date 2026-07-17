const API =
"https://umr-jewelers.onrender.com/products";


// GET PRODUCTS

export const getProducts =
async()=>{

const res =
await fetch(API);

return res.json();

};


// CREATE PRODUCT

export const createProduct =
async(product)=>{

const res=
await fetch(
API,
{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify(
product
)

}
);

return res.json();

};


// DELETE PRODUCT

export const deleteProduct =
async(id)=>{

await fetch(
`${API}/${id}`,
{

method:"DELETE"

}

);

};


// UPDATE PRODUCT

export const updateProduct =
async(id,data)=>{

const res=
await fetch(
`${API}/${id}`,
{

method:"PUT",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify(
data
)

}
);

return res.json();

};