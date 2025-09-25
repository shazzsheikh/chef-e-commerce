import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function CraftSection() {
  const [count, setCount] = useState(0);
  const target = 100;
  const ref = useRef(null); // ✅ JS version — no type

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 2000;
          const step = Math.ceil(duration / target);

          const interval = setInterval(() => {
            start++;
            setCount(start);
            if (start >= target) clearInterval(interval);
          }, step);

          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-[#3e402d] text-white md:py-20 py-8 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between max-w-[1200px] mx-auto">
        {/* Left Content */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-snug">
            Explore a wide <br /> selection of fabric
          </h2>
          <Link
            to=""
            className="text-yellow-400 font-semibold border-b border-yellow-400"
          >
            Learn More
          </Link>
        </div>

        {/* Right Content (Counter) */}
        <div
          ref={ref}
          className="w-full md:w-1/2 flex flex-col md:items-center text-left md:text-center"
        >
          <div className="text-4xl sm:text-5xl md:text-6xl font-bold">
            {count}+
          </div>
          <span className="block mt-2 tracking-widest text-sm sm:text-base">
            OUR CLIENT
          </span>
        </div>
      </div>
    </section>
  );
}
