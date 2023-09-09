import React, { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";

export default function NavBar() {
  const { scrollYProgress } = useScroll();
  const [top, setTop] = useState(false);

  const handleScrollChange = (value: any) => {
    if (value === 0) {
      setTop(true);
    } else {
      setTop(false);
    }
  };

  useEffect(() => {
    if (scrollYProgress.get() === 0) {
      setTop(true);
    } else {
      setTop(false);
    }
  }, []);

  scrollYProgress.onChange(handleScrollChange);

  return (
    <motion.nav
      className={`fixed top-0  z-10 md:flex hidden items-center md:justify-between w-full font-bold text-white px-24 xl:px-52 backdrop-blur-[3px] transition-all ${
        top ? "bg-transparent h-20" : "bg-white/5 h-24"
      }`}
    >
      <ul className="flex">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/instruktorzy">Instruktorzy</a>
        </li>
        <li>
          <a href="/galeria">Galeria</a>
        </li>
        <li>
          <a href="/kontakt">Kontakt</a>
        </li>
      </ul>
    </motion.nav>
  );
}
