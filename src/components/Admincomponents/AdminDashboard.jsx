import { useEffect,useState } from "react";
import {
IndianRupee,
ShoppingBag,
Users,
Package,

} from "lucide-react";

import {
BarChart,
Bar,
XAxis,
YAxis,
ResponsiveContainer,
Tooltip
}
from "recharts";

export default function AdminDashboard(){

const [products,setProducts]=
useState([]);

const [users,setUsers]=
useState([]);

const [orders,setOrders]=
useState([]);

const [reviews,setReviews]=
useState([]);

const [categories,setCategories]=
useState([]);

useEffect(()=>{
Promise.all([

fetch(
"http://localhost:5000/products"
).then(r=>r.json()),

fetch(
"http://localhost:5000/users"
).then(r=>r.json()),

fetch(
"http://localhost:5000/orders"
).then(r=>r.json()),

fetch(
"http://localhost:5000/reviews"
).then(r=>r.json()),

fetch(
"http://localhost:5000/categories"
).then(r=>r.json())

])

.then(([p,u,o,r,c])=>{

setProducts(p);
setUsers(u);
setOrders(o);
setReviews(r);
setCategories(c);

});

},[]);

const chartData=

products.slice(0,6)

.map(item=>({

name:
item.name
?.slice(0,10)
+"...",

sales:
Math.floor(

Math.random()*20

)+1

}));

const revenue=

orders.reduce(

(sum,item)=>

sum+item.total,

0

);

const cards=[

{
title:"Revenue",
value:`₹${revenue}`,
icon:IndianRupee
},

{
title:"Orders",
value:orders.length,
icon:ShoppingBag
},

{
title:"Customers",
value:users.length,
icon:Users
},

{
title:"Products",
value:products.length,
icon:Package
}

];


return(

<div
className="
px-3
sm:px-5
lg:px-0
overflow-hidden
"
>

<h1
className="
text-2xl
sm:text-3xl
lg:text-4xl

font-bold
text-[#5f4712]
"
>
Dashboard
</h1>

<p
className="
text-[#8c7650]
mt-2
"
>
Welcome back ✨
</p>

<div
className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-4
sm:gap-5
mt-6
"
>

{cards.map(item=>{

const Icon=item.icon;

return(

<div
key={item.title}

className="
bg-white
rounded-[30px]
border
border-[#ecd8a5]
p-2 sm:p-3

shadow-[0_10px_30px_rgba(200,162,75,.08)]
"
>

<div
className="
flex
justify-between
"
>

<div>

<p
className="
text-[#8c7650]
"
>
{item.title}
</p>

<h2
className="
mt-4
text-2xl sm:text-3xl
font-bold
text-[#5f4712]
"
>
{item.value}
</h2>

</div>

<div
className="
w-12
h-12
rounded-2xl

bg-[#fff4da]

flex
justify-center
items-center
"
>

<Icon
size={22}
className="
text-[#c8a24b]
"
/>

</div>

</div>

</div>

)

})}

</div>
<div
className="
grid
lg:grid-cols-[1.8fr_1fr]
gap-6
mt-10
"
>

{/* SALES */}

<div
className="
bg-white
rounded-[35px]
border
border-[#ecd8a5]
p-6
"
>

<h2
className="
text-xl
font-bold
text-[#5f4712]
mb-6
"
>
Sales Overview
</h2>

<div
className="
w-full
min-w-0
h-[240px]
sm:h-[300px]
lg:h-[350px]
"
>
{chartData.length > 0 && (

<ResponsiveContainer
  width={600}
  height={300}
>

  <BarChart
    data={chartData}
    margin={{
      top:10,
      right:10,
      left:-25,
      bottom:30
    }}
  >

    <XAxis
      dataKey="name"
      tick={{ fontSize:10 }}
      interval={0}
      angle={-15}
    />

    <YAxis
      tick={{ fontSize:10 }}
    />

    <Tooltip />

    <Bar
      dataKey="sales"
      fill="#c8a24b"
      radius={[10,10,0,0]}
    />

  </BarChart>

</ResponsiveContainer>

)}

</div>

</div>



{/* TOP CATEGORIES */}

<div
className="
bg-white
rounded-[35px]
border
border-[#ecd8a5]
p-6
"
>

<h2
className="
text-xl
font-bold
text-[#5f4712]
mb-6
"
>
Top Categories
</h2>

<div className="space-y-5">

{

categories.map(item=>(

<div
key={item.id}

className="
flex
items-center
justify-between
"
>

<div
className="
flex
items-center
gap-3
"
>

<img

src={item.image}

className="
w-10
h-10
sm:w-12
sm:h-12
rounded-full
object-cover
shrink-0
"
/>

<span>

{
item.name
}

</span>

</div>

<span
className="
text-[#c8a24b]
font-bold
"
>

{

products.filter(

p=>

p.category===item.slug

).length

}

</span>

</div>

))

}

</div>

</div>

</div>
<div
className="
bg-white
rounded-[25px] sm:rounded-[35px]
border
border-[#ecd8a5]
p-4 sm:p-7
mt-8
shadow-[0_10px_30px_rgba(200,162,75,.08)]
overflow-hidden
"
>

<div
className="
flex
flex-col sm:flex-row
justify-between
items-start sm:items-center
gap-3
mb-6
"
>

<h2
className="
text-xl sm:text-2xl
font-bold
text-[#5f4712]
"
>
Recent Orders
</h2>

<p
className="
text-xs sm:text-sm
text-[#8c7650]
"
>
Last 5 Orders
</p>

</div>


<div className="space-y-5">

{

orders
.slice()
.reverse()
.slice(0,5)

.map(order=>{

const user=

users.find(
u=>u.id===order.userId
);

const product=

products.find(
p=>

p.id.toString()===

order.items?.[0]
?.productId
?.toString()

);

return(

<div
key={order.id}

className="
flex
flex-col sm:flex-row
justify-between

gap-4

pb-5
border-b
border-[#f4ead0]

last:border-none
"
>

{/* LEFT */}

<div
className="
flex
items-start
gap-3
"
>

<img
  src={user.profilePic}
  alt=""
  onError={(e) => {
    e.target.src =
      "https://ui-avatars.com/api/?name=User";
  }}

className="
w-[55px]
h-[55px]

sm:w-[65px]
sm:h-[65px]

rounded-xl sm:rounded-2xl
object-cover
border
border-[#ecd8a5]

shrink-0
"
/>


<div>

<p
className="
font-bold
text-[#5f4712]
text-[14px]
sm:text-[16px]
"
>

{
user?.name
||

"Unknown User"
}

</p>


<p
className="
text-[#8c7650]
mt-1

text-[12px]
sm:text-sm
line-clamp-1
"
>

{
product?.name
||

"Jewellery Product"
}

</p>


<div
className="
flex
flex-wrap
gap-2
mt-2

text-[11px]
sm:text-xs

text-gray-500
"
>

<span>

📅

{
order.createdAt
}

</span>

<span>

🛍

{
order.items?.length
}

Items

</span>

</div>

</div>

</div>



{/* RIGHT */}

<div
className="
flex
sm:block

justify-between
items-center
"
>

<p
className="
text-lg
sm:text-xl

font-bold
text-[#c8a24b]
"
>

₹
{
order.total
}

</p>


<span
className={`

px-3
sm:px-4

py-1

rounded-full

text-[11px]
sm:text-xs

w-fit

${

order.orderStatus==="processing"

?

"bg-yellow-100 text-yellow-700"

:

order.orderStatus==="delivered"

?

"bg-green-100 text-green-700"

:

order.orderStatus==="cancelled"

?

"bg-red-100 text-red-600"

:

"bg-blue-100 text-blue-700"

}

`}
>

{
order.orderStatus
}

</span>

</div>

</div>

)

})

}

</div>

</div>
<div
className="
bg-white
rounded-[35px]
border
border-[#ecd8a5]
p-6
mt-8
"
>

<h2
className="
text-xl
font-bold
text-[#5f4712]
mb-6
"
>
Latest Reviews
</h2>

<div className="space-y-5">

{

reviews.slice(0,4)

.map(item=>(

<div
key={item.id}

className="
flex
gap-4
"
>

<img

src={item.image}

className="
w-12
h-12
sm:w-14
sm:h-14
rounded-xl
object-cover
shrink-0
"
/>

<div>

<p
className="
font-semibold
"
>
{item.user}
</p>

<p
className="
text-xs
sm:text-sm
text-[#8c7650]
break-words
"
>
{item.review||
item.comment}
</p>

</div>

</div>

))

}

</div>

</div>
</div>

)

}