// ========================== NAVBAR ==========================
import { Link, useNavigate } from "react-router-dom";
import {
  GiDiamondRing,
  GiHeartNecklace,
  GiDropEarrings,
  GiGemChain,
  GiCutDiamond,
} from "react-icons/gi";

import {
  FaGift,
  FaChevronDown,
} from "react-icons/fa";

export default function Nav() {
const navigate = useNavigate();

const handleNavigate = (item) => {
  if (item.section) {
    navigate("/");

    setTimeout(() => {
      const element =
        document.getElementById(item.section);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300);

    return;
  }

  navigate(`/category/${item.slug}`);
};

  const categories = [
  {
    name: "Earrings",
    slug: "earring-designs",
    icon: <GiDropEarrings size={14} />,
  },

  {
    name: "Rings",
    slug: "rings",
    icon: <GiDiamondRing size={14} />,
  },

  {
    name: "Bracelet & Bangles",
    slug: "bangles",
    icon: <GiCutDiamond size={13} />,
  },

  {
    name: "Necklaces & Pendants",
    slug: "necklace-sets",
    icon: <GiGemChain size={14} />,
  },

  {
    name: "Mangalsutra",
    slug: "mangalsutra",
    icon: <GiHeartNecklace size={14} />,
  },

  {
    name: "Hair Accessories",
    slug: "hair-accessories",
    icon: <GiCutDiamond size={13} />,
  },

{
  name: "Collections",
  slug: "#",
  target: "/",
  section: "gender-section",
  icon: <GiGemChain size={13} />,
},

  {
    name: "Gifting",
    slug: "pendant-sets",
    icon: <FaGift size={12} />,
  },

  {
    name: "More Jewellery",
    slug: "waistbands",
    icon: <FaChevronDown size={10} />,
  },
];

  return (

  <nav
className="
hidden md:block
w-full
bg-[#f8f4ee]
border-b
border-[#e7dfd2]

overflow-x-auto
scrollbar-hide
"
>

<div
  className="
  flex
  items-center
  justify-center
  gap-6
  px-4
  lg:px-8
  h-[43px]

  overflow-x-auto
  scrollbar-hide
  whitespace-nowrap
  "
>

  {categories.map((item, i) => (
<div
key={i}
onClick={() => handleNavigate(item)}
>

    <div
  className="
  relative
  flex
  items-center
  gap-2
  px-2
  py-4
  cursor-pointer
  group
  whitespace-nowrap"
>

        <span
          className="
          text-[#c3a04d]
          transition-all
          duration-300
          group-hover:scale-110"
        >
          {item.icon}
        </span>
<span
  className="
  relative

  text-[13px]
lg:text-[14px]
  font-[500]
  text-[#4d4338]

  tracking-[0.01em]

  transition-all
  duration-300

  group-hover:text-[#b88a1d]

  after:content-['']
  after:absolute
  after:left-0
  after:-bottom-[10px]

  after:h-[2px]
  after:w-0

  after:bg-[#c8a24b]

  after:transition-all
  after:duration-300

  group-hover:after:w-full
  "
>
  {item.name}
</span>

  

      </div>

    </div>

  ))}

</div>

    </nav>
  );
}