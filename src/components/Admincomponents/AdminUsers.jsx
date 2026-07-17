import { useEffect,useState } from "react";
import {
Search
} from "lucide-react";

export default function AdminUsers(){

const [users,setUsers]=
useState([]);

const [search,setSearch]=
useState("");

const [statusFilter,setStatusFilter]=
useState("all");


useEffect(()=>{

fetch(
"http://localhost:5000/users"
)

.then(res=>res.json())

.then(data=>{

setUsers(

data.filter(
item => item.role !== "admin"
)

);

});

},[]);



const toggleBlock=
async(id,current)=>{

await fetch(

`http://localhost:5000/users/${id}`,

{

method:"PATCH",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

isBlocked:
!current

})

}

);

setUsers(prev=>

prev.map(item=>

item.id===id

?

{
...item,
isBlocked:
!current
}

:

item

)

);

};



const deleteUser=
async(id)=>{

await fetch(

`http://localhost:5000/users/${id}`,

{
method:"DELETE"
}

);

setUsers(prev=>

prev.filter(

u=>

u.id!==id

)

);

};



const filteredUsers=

users.filter(item=>{

const searchMatch=

item.name
.toLowerCase()

.includes(
search.toLowerCase()
)

||

item.email
.toLowerCase()

.includes(
search.toLowerCase()
);


const statusMatch=

statusFilter==="all"

||

(

statusFilter==="active"

?

!item.isBlocked

:

item.isBlocked

);


return(

searchMatch
&&
statusMatch

);

});



const active=

users.filter(

u=>

!u.isBlocked

).length;


const blocked=

users.filter(

u=>

u.isBlocked

).length;


const revenue=

users.reduce(

(sum,item)=>

sum+
(
item.totalSpent||0
),

0

);


const avgOrder=

users.length

?

Math.floor(

revenue/

users.length

)

:

0;



return(

<div>

<h1
className="
text-2xl
sm:text-3xl
lg:text-4xl
font-bold
text-[#5f4712]
"
>
Customers
</h1>

<p
className="
text-[#8c7650]
mt-2
"
>
Manage your customer relationships
</p>



{/* STATS */}


<div
className="
grid
grid-cols-2
md:grid-cols-2
lg:grid-cols-4
gap-3
sm:gap-5
mt-6
"
>

{[

{
title:"Total Customers",
value:users.length,
color:"text-[#5f4712]"
},

{
title:"Active",
value:active,
color:"text-green-600"
},

{
title:"Blocked",
value:blocked,
color:"text-red-500"
},

{
title:"Total Revenue",
value:`₹${revenue}`,
color:"text-purple-500"
},

{
title:"Avg Order Value",
value:`₹${avgOrder}`,
color:"text-orange-500"
}

]

.map(item=>(

<div
key={item.title}
className="
bg-white
rounded-2xl
border
border-[#ecd8a5]
p-3
sm:p-4
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
className={`
mt-2
text-xl
sm:text-2xl
lg:text-3xl
font-bold

${item.color}
`}
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
md:flex-row
gap-3
mt-6
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
Search by name,email...
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

rounded-2xl

border
border-[#ecd8a5]

bg-white
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
w-full
md:w-[220px]
h-[50px]
px-4
rounded-xl
border
border-[#ecd8a5]
bg-white
"
>

<option value="all">

All Status

</option>

<option value="active">

Active

</option>

<option value="blocked">

Blocked

</option>

</select>

</div>



{/* TABLE */}


<div
className="
mt-6
bg-white
rounded-2xl
border
border-[#ecd8a5]
overflow-hidden
"
>

<table
className="
w-full
min-w-[1100px]
"
>

<thead>

<tr
className="
bg-[#fff7e8]
"
>

<th className="p-5">
Customer
</th>

<th>Email</th>

<th>Phone</th>

<th>Join Date</th>

<th>Orders</th>

<th>Spent</th>

<th>Status</th>

<th>Action</th>

</tr>

</thead>



<tbody>

{

filteredUsers.map(item=>(

<tr
key={item.id}

className="
border-t
hover:bg-[#fffdf8]
"
>

<td className="p-5">

<div
className="
flex
items-center
gap-4
"
>

<div
className="
w-10
h-10

rounded-full

bg-[#fff4da]

flex
items-center
justify-center

font-bold
text-[#c8a24b]
"
>

{
item.name
?.charAt(0)
}

</div>


<p
className="
font-medium
"
>

{
item.name
}

</p>

</div>

</td>


<td>

{
item.email
}

</td>


<td>

{
item.phone
||

"N/A"
}

</td>


<td>

{
item.createdAt
}

</td>


<td>

{
item.orders?.length
||0
}

</td>


<td
className="
font-bold
"
>

₹
{
item.totalSpent
||0
}

</td>


<td>

<span
className={`

px-4
py-2

rounded-full

text-sm

${

item.isBlocked

?

"bg-red-100 text-red-600"

:

"bg-green-100 text-green-600"

}

`}
>

{

item.isBlocked

?

"Blocked"

:

"Active"

}

</span>

</td>



<td>

<div
className="
flex
gap-5
"
>

<button

onClick={()=>

toggleBlock(

item.id,
item.isBlocked

)

}

className="
text-[#c8a24b]
"
>

{

item.isBlocked

?

"Unblock"

:

"Block"

}

</button>


<button

onClick={()=>

deleteUser(
item.id
)

}

className="
text-red-500
"
>

Delete

</button>

</div>

</td>

</tr>

))

}

</tbody>

</table>

</div>

</div>

)

}