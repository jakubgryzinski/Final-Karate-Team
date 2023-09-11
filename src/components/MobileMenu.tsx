import React, { useState, useRef, useEffect } from "react";

export default function MobileMedu() {
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickListener);

    return () => {
      document.removeEventListener("mousedown", handleClickListener);
    };
  }, []);

  const handleClickListener = (e: any) => {
    if (
      buttonRef.current!.contains(e.target) ||
      menuRef.current!.contains(e.target)
    ) {
      return;
    }
    setIsOpen(false);
  };

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        ref={buttonRef}
        className={`md:hidden inline-flex items-center w-10 h-10 justify-center text-sm  rounded-lg  transition-all  ${
          isOpen ? "text-gray-500" : "text-light"
        }`}
        onClick={toggleIsOpen}
        data-collapse-toggle="navbar-default"
        type="button"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          ></path>
        </svg>
      </button>
      <div
        ref={menuRef}
        className={`w-full px-2 top-20 left-0 z-40  ${
          isOpen ? "fixed" : "hidden"
        }`}
      >
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-2 rounded-lg bg-black/60  ">
          <li>
            <a
              href="/instruktorzy"
              onClick={() => setIsOpen(false)}
              className="block py-2 pl-3 pr-4 rounded text-light hover:bg-black/30 "
            >
              Instruktorzy
            </a>
          </li>
          <li>
            <a
              href="/galeria"
              onClick={() => setIsOpen(false)}
              className="block py-2 pl-3 pr-4 rounded text-light hover:bg-black/30"
            >
              Galeria
            </a>
          </li>
          <li>
            <a
              href="/kontakt"
              onClick={() => setIsOpen(false)}
              className="block py-2 pl-3 pr-4 rounded text-light hover:bg-black/30 "
            >
              Kontakt
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
