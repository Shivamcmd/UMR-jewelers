import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  UserCircle,
  Menu,
  X
} from "lucide-react";

import { useState } from "react";

import {
  NavLink,
  Routes,
  Route,
} from "react-router-dom";

import { Navigate } from "react-router-dom";

import AdminDashboard from "../components/Admincomponents/AdminDashboard";
import AdminProducts from "../components/Admincomponents/AdminProducts";
import AdminOrders from "../components/Admincomponents/AdminOrders";
import AdminUsers from "../components/Admincomponents/AdminUsers";
import AdminProfile from "../components/Admincomponents/AdminProfile";
import ScrollToTopButton from "../components/ScrollToTopButton";

const menu = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },

  {
    name: "Products",
    path: "/admin/products",
    icon: Package,
  },

  {
    name: "Orders",
    path: "/admin/orders",
    icon: ShoppingCart,
  },

  {
    name: "Customers",
    path: "/admin/users",
    icon: Users,
  },

  {
    name: "Profile",
    path: "/admin/profile",
    icon: UserCircle,
  },
];

export default function AdminRoutes() {

const user = JSON.parse(
localStorage.getItem("user")
);

const [isSidebarOpen,setIsSidebarOpen]=
useState(false);

if(
!user ||
user.role!=="admin"
){

return <Navigate to="/"/>

}
  return (

<div
className="
min-h-screen
bg-[#fffdf8]

flex
w-full

overflow-x-hidden
relative
"
>
<button

onClick={()=>
setIsSidebarOpen(true)
}

className={`

lg:hidden
fixed

top-[75px]
left-4

bg-white
p-3

rounded-xl
shadow-lg

border
border-[#ecd8a5]

transition-all
duration-300

${
isSidebarOpen
?

"opacity-0 pointer-events-none"

:

"opacity-100"
}

z-[60]

`}
>

<Menu size={22}/>
</button>

{
isSidebarOpen && (

<div
onClick={()=>
setIsSidebarOpen(false)
}
className="
fixed
inset-0
bg-black/40
z-40
lg:hidden
"
/>

)
}

{/* SIDEBAR */}

<div
className={`

fixed
top-0
left-0

w-[260px]
h-screen

bg-gradient-to-b
from-[#fffaf0]
to-[#fdf4df]

border-r
border-[#ecd8a5]

p-6

z-50

transition-transform
duration-300

${
isSidebarOpen
?

"translate-x-0"

:

"-translate-x-full"
}

lg:translate-x-0
lg:relative
lg:shrink-0

`}

>

<div
className="
flex
justify-between
items-center
mb-5
lg:hidden
"
>

<h2 className="font-bold text-xl">
Admin
</h2>

<button
onClick={()=>
setIsSidebarOpen(false)
}
>
<X size={22}/>
</button>

</div>


<h1
className="
text-[28px]
font-bold
text-[#c8a24b]
"
>
UMR Admin
</h1>

<p
className="
text-[#8c7650]
text-sm
mb-10
"
>
Jewellery Panel
</p>

<div className="space-y-2">

{menu.map((item)=>{

const Icon=item.icon;

return(

<NavLink
key={item.name}
to={item.path}

end={item.path==="/admin"}

onClick={()=>
setIsSidebarOpen(false)
}

className={({isActive})=>`

flex
items-center
gap-3
px-4
py-4
rounded-2xl
transition-all

${
isActive
?
"bg-[#c8a24b] text-white shadow-lg"
:
"text-[#5f4712] hover:bg-[#f9f1df]"
}

`}
>

<Icon size={18}/>
{item.name}

</NavLink>

)

})}

</div>



</div>
{/* RIGHT */}

<div
className="
flex-1
w-full
min-w-0

pt-20
lg:pt-0

overflow-x-hidden
"
>

<div
className="
p-4
sm:p-6
w-full
"
>

<Routes>

<Route
index
element={<AdminDashboard />}
/>

<Route
path="products"
element={<AdminProducts />}
/>

<Route
path="orders"
element={<AdminOrders />}
/>

<Route
path="users"
element={<AdminUsers />}
/>

<Route
path="profile"
element={<AdminProfile />}
/>

</Routes>
<ScrollToTopButton/>
</div>

</div>
</div>
  );
}