import {

createContext,
useContext,
useEffect,
useState

}

from "react";

import {

getProducts

}

from "../services/productService";

const ProductContext=
createContext();

export const ProductProvider=
({children})=>{

const [products,setProducts]=
useState([]);

const fetchProducts=
async()=>{

try{

const data=
await getProducts();

setProducts(data);

}

catch(error){

console.log(
error
);

}

};

useEffect(()=>{

fetchProducts();

},[]);


return(

<ProductContext.Provider

value={{

products,
setProducts,
fetchProducts

}}

>

{children}

</ProductContext.Provider>

)

};

export const useProducts=
()=>useContext(
ProductContext
);