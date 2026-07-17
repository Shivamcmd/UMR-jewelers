// ========================== PROFILE PAGE ==========================

import {
  Camera,
  Mail,
  Phone,
  MapPin,
  User,
  Save,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

export default function ProfilePage() {

  const [user, setUser] =
    useState(null);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      bio: "",
      city: "",
      gender: "",
      profilePic: "",
    });

  useEffect(() => {

    const storedUser =
      JSON.parse(
        localStorage.getItem("user")
      );

    if (storedUser) {

      setUser(storedUser);

      setFormData({
        name:
          storedUser.name || "",
        email:
          storedUser.email || "",
        phone:
          storedUser.phone || "",
        bio:
          storedUser.bio || "",
        city:
          storedUser.city || "",
        gender:
          storedUser.gender || "",
        profilePic:
          storedUser.profilePic || "",
      });
    }

  }, []);

  // ================= UPDATE INPUT =================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // ================= PROFILE IMAGE =================

  const handleImage =
    (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      const reader =
        new FileReader();

      reader.onloadend = () => {

        setFormData({
          ...formData,
          profilePic:
            reader.result,
        });
      };

      reader.readAsDataURL(file);
    };

  // ================= SAVE PROFILE =================

const handleSave = async () => {

  const updatedUser = {
    ...user,
    ...formData,
  };

  try {

    const res = await fetch(
      `https://umr-jewelers.onrender.com/users/${user.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(
          updatedUser
        ),
      }
    );

    const savedUser =
      await res.json();

    localStorage.setItem(
      "user",
      JSON.stringify(savedUser)
    );

    setUser(savedUser);

    window.dispatchEvent(
      new Event("userUpdated")
    );

    toast.success(
      "Profile Updated Successfully"
    );

  } catch (error) {

    toast.error(
      "Failed to update profile"
    );

  }
};

  return (

    <div
      className="
      min-h-screen
      bg-[#faf8f4]
      px-4
      py-5"
    >

      <div
        className="
        max-w-6xl
        mx-auto
        grid
        lg:grid-cols-[350px_1fr]
        gap-6 
        items-start"
      >

        {/* ================= LEFT CARD ================= */}

  <div
  className="
  bg-white
  rounded-[30px]
  border
  border-[#eee3d2]
  p-6
  shadow-sm"
>

  {/* TOP */}

  <div
    className="
    flex
    flex-col
    items-center
    text-center"
  >

    {/* IMAGE */}

    <div
      className="
      relative
      "
      
    >

      <div
        className="
        w-[110px]
        h-[110px]
        rounded-full
        overflow-hidden
        border-[5px]
        border-[#f5ead6]
        shadow-sm"
      >

        <img
          src={
            formData.profilePic ||
            "https://cdn-icons-png.flaticon.com/512/847/847969.png"
          }

          alt="profile"

          className="
          w-full
          h-full
          object-cover"
        />

      </div>

      {/* CAMERA */}

      <label
        className="
        absolute
        bottom-1
        right-1
        w-9
        h-9
        rounded-full
        bg-[#c8a24a]
        text-white
        flex
        items-center
        justify-center
        cursor-pointer
        shadow-md
        hover:scale-105
        transition-all"
      >

        <Camera size={15} />

        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleImage}
        />

      </label>

    </div>

    {/* NAME */}

    <h2
      className="
      mt-5
      text-[24px]
      font-semibold
      text-[#3f372f]"
    >

      {formData.name ||
        "Your Name"}

    </h2>

    <p
      className="
      text-[14px]
      text-[#9d8e7c]
      mt-1"
    >

      UMR Member

    </p>

    {/* BADGE */}

    <div
      className="
      mt-4
      inline-flex
      items-center
      justify-center
      px-4
      py-2
      rounded-full
      bg-[#faf4e7]
      text-[#b58a2f]
      text-[13px]
      font-medium"
    >

      Active Account

    </div>

  </div>

  {/* DIVIDER */}

  <div
    className="
    my-6
    h-[1px]
    bg-[#f3ece1]"
  />

  {/* DETAILS */}

  <div
    className="
    space-y-5"
  >

    {/* EMAIL */}

    <div
      className="
      flex
      items-start
      gap-4"
    >

      <div
        className="
        w-11
        h-11
        rounded-2xl
        bg-[#faf5ec]
        flex
        items-center
        justify-center
        shrink-0"
      >

        <Mail
          size={18}
          className="
          text-[#b58a2f]"
        />

      </div>

      <div
        className="
        flex-1
        min-w-0"
      >

        <p
          className="
          text-[12px]
          text-[#a19282]
          mb-1"
        >

          Email Address

        </p>

        <p
          className="
          text-[15px]
          text-[#4c4339]
          break-words
          leading-relaxed"
        >

          {formData.email}

        </p>

      </div>

    </div>

    {/* PHONE */}

    <div
      className="
      flex
      items-start
      gap-4"
    >

      <div
        className="
        w-11
        h-11
        rounded-2xl
        bg-[#faf5ec]
        flex
        items-center
        justify-center
        shrink-0"
      >

        <Phone
          size={18}
          className="
          text-[#b58a2f]"
        />

      </div>

      <div
        className="
        flex-1"
      >

        <p
          className="
          text-[12px]
          text-[#a19282]
          mb-1"
        >

          Phone Number

        </p>

        <p
          className="
          text-[15px]
          text-[#4c4339]"
        >

          {formData.phone}

        </p>

      </div>

    </div>

    {/* CITY */}

    <div
      className="
      flex
      items-start
      gap-4"
    >

      <div
        className="
        w-11
        h-11
        rounded-2xl
        bg-[#faf5ec]
        flex
        items-center
        justify-center
        shrink-0"
      >

        <MapPin
          size={18}
          className="
          text-[#b58a2f]"
        />

      </div>

      <div
        className="
        flex-1"
      >

        <p
          className="
          text-[12px]
          text-[#a19282]
          mb-1"
        >

          City

        </p>

        <p
          className="
          text-[15px]
          text-[#4c4339]"
        >

          {formData.city ||
            "Your City"}

        </p>

      </div>

    </div>

  </div>

</div>

        {/* ================= RIGHT SECTION ================= */}

        <div
          className="
          bg-white
          rounded-[30px]
          border
          border-[#eee3d2]
          p-8
          shadow-sm"
        >

          {/* TITLE */}

          <div
            className="
            mb-8"
          >

            <h1
              className="
              text-[30px]
              font-semibold
              text-[#3e352c]"
            >

              My Profile

            </h1>

            <p
              className="
              text-[#9c9080]
              mt-2"
            >

              Manage your account
              details and personal
              information

            </p>

          </div>

          {/* FORM */}

          <div
            className="
            grid
            md:grid-cols-2
            gap-6"
          >

            {/* NAME */}

            <div>

              <label
                className="
                text-sm
                font-medium
                text-[#5f554a]"
              >

                Full Name

              </label>

              <div
                className="
                mt-2
                flex
                items-center
                gap-3
                h-[52px]
                px-4
                rounded-2xl
                border
                border-[#e9dece]
                bg-[#fcfbf8]"
              >

                <User
                  size={18}
                  className="
                  text-[#b99a5d]"
                />

                <input
                  type="text"
                  name="name"
                  value={
                    formData.name
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Enter name"

                  className="
                  w-full
                  bg-transparent
                  outline-none
                  text-[#453d35]"
                />

              </div>

            </div>

            {/* EMAIL */}

            <div>

              <label
                className="
                text-sm
                font-medium
                text-[#5f554a]"
              >

                Email Address

              </label>

              <div
                className="
                mt-2
                flex
                items-center
                gap-3
                h-[52px]
                px-4
                rounded-2xl
                border
                border-[#e9dece]
                bg-[#fcfbf8]"
              >

                <Mail
                  size={18}
                  className="
                  text-[#b99a5d]"
                />

                <input
                  type="email"
                  name="email"
                  value={
                    formData.email
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Enter email"

                  className="
                  w-full
                  bg-transparent
                  outline-none
                  text-[#453d35]"
                />

              </div>

            </div>

            {/* PHONE */}

            <div>

              <label
                className="
                text-sm
                font-medium
                text-[#5f554a]"
              >

                Phone Number

              </label>

              <div
                className="
                mt-2
                flex
                items-center
                gap-3
                h-[52px]
                px-4
                rounded-2xl
                border
                border-[#e9dece]
                bg-[#fcfbf8]"
              >

                <Phone
                  size={18}
                  className="
                  text-[#b99a5d]"
                />

                <input
                  type="text"
                  name="phone"
                  value={
                    formData.phone
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Enter phone"

                  className="
                  w-full
                  bg-transparent
                  outline-none
                  text-[#453d35]"
                />

              </div>

            </div>

            {/* CITY */}

            <div>

              <label
                className="
                text-sm
                font-medium
                text-[#5f554a]"
              >

                City

              </label>

              <div
                className="
                mt-2
                flex
                items-center
                gap-3
                h-[52px]
                px-4
                rounded-2xl
                border
                border-[#e9dece]
                bg-[#fcfbf8]"
              >

                <MapPin
                  size={18}
                  className="
                  text-[#b99a5d]"
                />

                <input
                  type="text"
                  name="city"
                  value={
                    formData.city
                  }

                  onChange={
                    handleChange
                  }

                  placeholder="Enter city"

                  className="
                  w-full
                  bg-transparent
                  outline-none
                  text-[#453d35]"
                />

              </div>

            </div>

          </div>

          {/* BIO */}

          <div
            className="
            mt-7"
          >

            <label
              className="
              text-sm
              font-medium
              text-[#5f554a]"
            >

              Bio

            </label>

            <textarea
              rows="3"
              name="bio"
              value={
                formData.bio
              }

              onChange={
                handleChange
              }

              placeholder="Write something about yourself..."

              className="
              mt-2
              w-full
              rounded-2xl
              border
              border-[#e9dece]
              bg-[#fcfbf8]
              p-4
              outline-none
              resize-none
              text-[#453d35]"
            />

          </div>

          {/* SAVE BUTTON */}

          <button
            onClick={handleSave}

            className="
            mt-8
            h-[52px]
            px-8
            rounded-full
            bg-[#c8a24a]
            text-white
            font-medium
            flex
            items-center
            gap-3
            hover:scale-[1.02]
            transition-all
            shadow-[0_10px_25px_rgba(200,162,74,0.25)]"
          >

            <Save size={18} />

            Save Changes

          </button>

        </div>

      </div>

    </div>
  );
}