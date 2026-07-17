import { useEffect, useState } from "react";
import {
Search,
Package
} from "lucide-react";

export default function AdminOrders(){

const [orders,setOrders]=
useState([]);

const [users,setUsers]=
useState([]);

const [search,setSearch]=
useState("");

const [statusFilter,setStatusFilter]=
useState("all");

useEffect(()=>{

Promise.all([

fetch(
"https://umr-jewelers.onrender.com/orders"
)
.then(res=>res.json()),

fetch(
"https://umr-jewelers.onrender.com/users"
)
.then(res=>res.json())

])

.then(([o,u])=>{

setOrders(o);
setUsers(u);

});

},[]);



const getUser=(id)=>{

return users.find(
u=>u.id===id
);

};



const updateStatus=
async(id,newStatus)=>{

await fetch(

`https://umr-jewelers.onrender.com/orders/${id}`,

{

method:"PATCH",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

orderStatus:newStatus

})

}

);

setOrders(prev=>

prev.map(item=>

item.id===id

?

{
...item,
orderStatus:newStatus
}

:

item

)

);

};



const filteredOrders=

orders.filter(item=>{

const user=
getUser(item.userId);

const searchMatch=

user?.name
?.toLowerCase()
.includes(
search.toLowerCase()
)

||

item.id
.toLowerCase()
.includes(
search.toLowerCase()
);


const statusMatch=

statusFilter==="all"

||

item.orderStatus===
statusFilter;


return(

searchMatch
&&
statusMatch

);

});



const pending=

orders.filter(
i=>

i.orderStatus===
"pending"

).length;

const processing=

orders.filter(
i=>

i.orderStatus===
"processing"

).length;

const delivered=

orders.filter(
i=>

i.orderStatus===
"delivered"

).length;





return(

<div>

<h1
className="
text-4xl
font-bold
text-[#5f4712]
"
>
Orders
</h1>

<p
className="
text-[#8c7650]
mt-2
"
>
Manage customer orders
</p>


{/* STATS */}


<div
className="
grid
grid-cols-2
lg:grid-cols-4
gap-5
mt-8
"
>

{[

{
title:"Total",
value:orders.length
},

{
title:"Pending",
value:pending
},

{
title:"Processing",
value:processing
},

{
title:"Delivered",
value:delivered
}

].map(item=>(

<div
key={item.title}

className="
bg-white
rounded-[28px]
border
border-[#ecd8a5]
p-2
md:p-3
"
>

<p
className="
text-[#8c7650]
"
>
{item.title}
</p>

<h2
className="
mt-3
text-3xl
font-bold
text-[#c8a24b]
"
>
{item.value}
</h2>

</div>

))

}

</div>



{/* SEARCH */}


<div
className="
flex
flex-col
lg:flex-row
gap-4
mt-8
"
>

<div
className="
relative
flex-1
"
>

<Search
size={18}
className="
absolute
left-4
top-[16px]
text-[#8c7650]
"
/>

<input
placeholder="
Search customer/order...
"

value={search}

onChange={(e)=>
setSearch(
e.target.value
)
}

className="
w-full
h-[54px]

pl-12
pr-5

rounded-2xl

border
border-[#ecd8a5]

bg-white
outline-none

focus:border-[#c8a24b]
"
/>

</div>


<select

value={statusFilter}

onChange={(e)=>

setStatusFilter(
e.target.value
)

}

className="
h-[54px]
px-5

rounded-2xl

border
border-[#ecd8a5]

bg-white
"
>

<option value="all">
All
</option>

<option value="pending">
Pending
</option>

<option value="processing">
Processing
</option>

<option value="shipped">
Shipped
</option>

<option value="delivered">
Delivered
</option>

<option value="cancelled">
Cancelled
</option>

</select>

</div>



{/* TABLE */}



<div
className="
mt-8
bg-white
rounded-[30px]
border
border-[#ecd8a5]
overflow-x-auto
"
>

<div className="overflow-x-auto scrollbar-thin">

<table
className="
w-full
min-w-[850px]
text-sm
"
>
 

<thead>

<tr
className="
bg-[#fff7e8]
text-[#5f4712]
"
>

<th className="p-3 sm:p-5 whitespace-nowrap">
Order ID
</th>

<th>
Customer
</th>

<th>
Date
</th>

<th>
Items
</th>

<th>
Total
</th>

<th>
Payment
</th>

<th>
Status
</th>

<th>
View
</th>

</tr>

</thead>



<tbody>

{

filteredOrders.map(item=>{

const user=
getUser(
item.userId
);

return(

<tr
key={item.id}

className="
border-t
hover:bg-[#fffdf8]
"
>

<td className="p-3 sm:p-5 whitespace-nowrap">
{item.id}
</td>

<td>

<div>

<p
className="
font-semibold
"
>
{
user?.name
}
</p>

<p
className="
text-sm
text-gray-500
"
>
{
user?.email
}
</p>

</div>

</td>


<td>

{
item.createdAt
||

"23/05/2026"
}

</td>


<td>

{
item.items?.length
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
item.total
}

</td>


<td>

{
item.paymentStatus
||

"COD"
}

</td>


<td>

<select

value={
item.orderStatus
}

onChange={(e)=>

updateStatus(

item.id,

e.target.value

)

}

className={`

rounded-full
px-2
sm:px-4
py-1
sm:py-2
text-xs
sm:text-sm
border-0

${

item.orderStatus
==="processing"

?

"bg-yellow-100 text-yellow-700"

:

item.orderStatus
==="delivered"

?

"bg-green-100 text-green-700"

:

item.orderStatus
==="cancelled"

?

"bg-red-100 text-red-600"

:

item.orderStatus
==="shipped"

?

"bg-blue-100 text-blue-600"

:

"bg-gray-100"

}

`}

>

<option>
pending
</option>

<option>
processing
</option>

<option>
shipped
</option>

<option>
delivered
</option>

<option>
cancelled
</option>

</select>

</td>


<td>

<button
className="
text-blue-500
font-medium
"
>

👁 View

</button>

</td>

</tr>

)

})

}

</tbody>

</table>
</div>
</div>

</div>

)

}