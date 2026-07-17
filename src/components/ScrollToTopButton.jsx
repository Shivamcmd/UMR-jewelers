import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTopButton() {

const [show,setShow]=useState(false);

useEffect(()=>{

const handleScroll=()=>{

if(window.scrollY>300){

setShow(true);

}else{

setShow(false);

}

};

window.addEventListener(
"scroll",
handleScroll
);

return()=>{

window.removeEventListener(
"scroll",
handleScroll
);

};

},[]);

const scrollTop=()=>{

window.scrollTo({

top:0,
behavior:"smooth"

});

};

return(

show && (

<button

onClick={scrollTop}

className="
fixed
bottom-6
right-6
z-[999]

w-12
h-12

rounded-full

bg-[#c8873a]
text-white

shadow-lg

flex
items-center
justify-center

hover:scale-110
transition-all
duration-300
"

>

<ChevronUp size={22}/>

</button>

)

);

}