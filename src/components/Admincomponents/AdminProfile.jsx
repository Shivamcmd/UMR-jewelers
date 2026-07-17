import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminProfile() {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    phone: "",
    image: ""
  });

  const [editing, setEditing] = useState(false);

  // Admin ID
  const adminId = "admin001";

  useEffect(() => {
    fetch(`https://umr-jewelers.onrender.com//users/${adminId}`)
      .then((res) => res.json())
      .then((data) =>
        setAdmin({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          image: data.image || ""
        })
      )
      .catch((err) => console.log(err));
  }, []);

const saveProfile = async () => {

try {

await fetch(
`https://umr-jewelers.onrender.com/users/${adminId}`,
{
method:"PATCH",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(admin)

}
);

const updatedUser={

...JSON.parse(
localStorage.getItem("user")
),

...admin

};

setAdmin(updatedUser);

localStorage.setItem(
"user",
JSON.stringify(
updatedUser
)
);

window.dispatchEvent(

new CustomEvent(
"userUpdated",
{
detail:updatedUser
}
)

);

toast.success(
"Profile Updated ✅"
);

setEditing(false);

}
catch(error){

console.log(error);

toast.error(
"Failed to update ❌"
);

}

};

  // image -> 
  const handleImage=(e)=>{

const file=
e.target.files[0];

if(!file) return;

const reader=
new FileReader();

reader.onload=()=>{

setAdmin(prev=>({

...prev,
image:reader.result

}));

};

reader.readAsDataURL(
file
);

};

  return (
    <div className="flex justify-center mt-10 px-4">

      <div className="
      w-full
      max-w-[900px]
      bg-white
      rounded-[30px]
      border border-[#ecd8a5]
      shadow-[0_10px_30px_rgba(200,162,75,.08)]
      p-6 md:p-10">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-[28px] font-bold text-[#5f4712]">
            Admin Profile
          </h2>

          <button
            onClick={() => {
              editing
                ? saveProfile()
                : setEditing(true);
            }}
            className="
            px-6 py-3
            rounded-2xl
            bg-[#c8873a]
            text-white
            hover:opacity-90"
          >
            {editing
              ? "Save Profile"
              : "Edit Profile"}
          </button>

        </div>

        {/* Image */}

        <div className="
        flex
        justify-center
        mb-10
        relative">

          <img
            src={
              admin.image ||
              "https://via.placeholder.com/120"
            }
            alt=""
            className="
            w-[110px]
            h-[110px]
            rounded-full
            object-cover
            border-[4px]
            border-[#ecd8a5]
            shadow-lg"
          />

          {editing && (

            <label className="
            absolute
            bottom-0
            right-[38%]
            w-9
            h-9
            rounded-full
            bg-[#c8a24b]
            flex
            items-center
            justify-center
            cursor-pointer">

              📷

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImage}
              />

            </label>

          )}

        </div>

        {/* Inputs */}

        <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-6">

          <div>
            <label className="block mb-2 font-medium">
              Name
            </label>

            <input
              disabled={!editing}
              value={admin.name}
              onChange={(e) =>
                setAdmin({
                  ...admin,
                  name: e.target.value
                })
              }
              className="
              w-full
              h-[52px]
              px-4
              rounded-xl
              border"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              disabled={!editing}
              value={admin.email}
              onChange={(e) =>
                setAdmin({
                  ...admin,
                  email: e.target.value
                })
              }
              className="
              w-full
              h-[52px]
              px-4
              rounded-xl
              border"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Phone
            </label>

            <input
              disabled={!editing}
              value={admin.phone}
              onChange={(e) =>
                setAdmin({
                  ...admin,
                  phone: e.target.value
                })
              }
              className="
              w-full
              h-[52px]
              px-4
              rounded-xl
              border"
            />
          </div>

        </div>

      </div>

    </div>
  );
}