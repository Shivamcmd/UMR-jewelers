import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Are your jewellery pieces anti-tarnish?",
    answer:
      "Yes, our jewellery is crafted with premium quality materials and anti-tarnish coating for long-lasting shine.",
  },
  {
    question: "Do you offer Cash on Delivery?",
    answer:
      "Yes, we offer Cash on Delivery on selected locations across India.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Orders are usually delivered within 4-7 business days depending on your location.",
  },
  {
    question: "Can I return or exchange my order?",
    answer:
      "Absolutely. We offer easy returns and exchanges within 14 days of delivery.",
  },
  {
    question: "Is your jewellery suitable for daily wear?",
    answer:
      "Yes, our collections are designed for both daily elegance and special occasions.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
  <section className="w-full py-20 px-4 relative overflow-hidden">

  {/* GOLD GLOW */}
  <div
    className="absolute top-0 left-1/2 -translate-x-1/2
    w-[500px] h-[500px] bg-[#d4af37]/10 blur-[140px]"
  />

  <div className="max-w-4xl mx-auto relative z-10">

    {/* HEADING */}
    <div className="text-center mb-14">

      <p
        className="text-[#b68b2c] text-sm sm:text-base
        tracking-[5px] uppercase font-medium"
      >
        Need Help?
      </p>

      <h2
        className="text-4xl sm:text-5xl md:text-6xl
        font-light text-[#3d2b0a] mt-3"
      >
        Frequently Asked
      </h2>

      <h3
        className="text-4xl sm:text-5xl md:text-6xl
        font-semibold text-[#c79b2c]"
      >
        Questions
      </h3>

      <div
        className="w-28 h-[2px]
        bg-gradient-to-r from-transparent
        via-[#d4af37] to-transparent
        mx-auto mt-6 rounded-full"
      />
    </div>

    {/* FAQ BOX */}
    <div className="space-y-5">

      {faqs.map((faq, index) => (
        <div
          key={index}
          className="
          bg-white/80
          backdrop-blur-md
          border border-[#ecd9a2]
          rounded-3xl overflow-hidden
          shadow-[0_8px_30px_rgba(212,175,55,0.08)]
          transition-all duration-300
          hover:border-[#d4af37]
          hover:-translate-y-[2px]
          hover:shadow-[0_10px_40px_rgba(212,175,55,0.18)]
          "
        >

          {/* QUESTION */}
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex items-center justify-between
            text-left px-6 sm:px-8 py-6"
          >

            <h3
              className="text-[15px] sm:text-lg
              font-medium text-[#3b2a0b]
              pr-4 leading-relaxed"
            >
              {faq.question}
            </h3>

            <div
              className="
              min-w-[42px] min-h-[42px]
              rounded-full
              bg-gradient-to-br
              from-[#e6c15a]
              to-[#b8860b]
              flex items-center justify-center
              shadow-lg shadow-[#d4af37]/20
              "
            >
              {openIndex === index ? (
                <Minus
                  size={18}
                  className="text-white"
                />
              ) : (
                <Plus
                  size={18}
                  className="text-white"
                />
              )}
            </div>

          </button>

          {/* ANSWER */}
          <div
            className={`grid transition-all duration-300 ease-in-out ${
              openIndex === index
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >

            <div className="overflow-hidden">

              <p
                className="
                px-6 sm:px-8 pb-6
                text-sm sm:text-[15px]
                text-[#6b5a36]
                leading-relaxed
                "
              >
                {faq.answer}
              </p>

            </div>
          </div>
        </div>
      ))}
    </div>

  </div>
</section>
  );
}