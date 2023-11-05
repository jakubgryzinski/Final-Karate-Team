import React, { useState, useEffect } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import useKeypress from "react-use-keypress";
import { useStore } from "@nanostores/react";
import { $isOpen, $index } from "../store";

interface CarouselProps {
  images: any;
}


let collapsedAspectRatio = 1 / 3;
let fullAspectRatio = 3 / 2;
let gap = 2;
let margin = 12;

export default function Carousel({ images }: CarouselProps) {
  let [index, setIndex] = useState(0);

  console.log(images)

  const isOpen = useStore($isOpen);

  useEffect(() => {
    if ($index.value) {
      setIndex($index.value - 1);
    }
  }, [isOpen]);

  useKeypress("ArrowRight", () => {
    if (index + 1 < images.length) {
      setIndex(index + 1);
    }
  });

  useKeypress("ArrowLeft", () => {
    if (index > 0) {
      setIndex((i) => i - 1);
    }
  });

  useKeypress("Escape", () => {
    $isOpen.set(false);
  });

  return (
    <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
      <div
        className={`fixed w-full h-full top-0 z-40 left-0 bg-black bg-opacity-50 ${
          isOpen ? "visible bg-opacity-50" : "invisible bg-opacity-0"
        }`}
        onClick={() => $isOpen.set(false)}
      ></div>

      <button
        className={`text-light fixed top-10 right-10 z-50 ${
          isOpen ? "visible " : "invisible bg-opacity-0"
        }`}
        onClick={() => $isOpen.set(false)}
      >
        <svg
          className="text-light hover:text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div
        className={`max-w-7xl bg-black z-50 fixed top-1/2  transform -translate-y-1/2 ${
          isOpen ? "visible " : "invisible bg-opacity-0"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center">
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ x: `-${index * 100}%` }}
              className="flex  aspect-[3/2]"
            >
              {images.map(({ photo }, i) => (
                <motion.img
                  key={i}
                  src={photo.url}
                  animate={{ opacity: i === index ? 1 : 0.3 }}
                  className="aspect-[3/2] object-contain"
                />
              ))}
            </motion.div>
            <AnimatePresence initial={false}>
              {index > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: "none" }}
                  whileHover={{ opacity: 1 }}
                  className="absolute left-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                  onClick={() => setIndex(index - 1)}
                >
                  <svg
                    className="text-gray-900"
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {index + 1 < images.length && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0, pointerEvents: "none" }}
                  whileHover={{ opacity: 1 }}
                  className="absolute right-2 top-1/2 -mt-4 flex h-8 w-8 items-center justify-center rounded-full bg-white"
                  onClick={() => setIndex(index + 1)}
                >
                  <svg
                    className="text-gray-900"
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute inset-x-0 -bottom-16 flex justify-center overflow-hidden ">
            <motion.div
              initial={false}
              animate={{
                x: `-${
                  index * 100 * (collapsedAspectRatio / fullAspectRatio) +
                  index * gap +
                  margin
                }%`,
              }}
              style={{ aspectRatio: fullAspectRatio, gap: `${gap}%` }}
              className="flex h-14"
            >
              {images.map(({ photo }, i) => (
                <motion.button
                  key={i}
                  onClick={() => setIndex(i)}
                  whileHover={{ opacity: 1 }}
                  initial={false}
                  animate={i === index ? "active" : "inactive"}
                  variants={{
                    active: {
                      marginLeft: `${margin}%`,
                      marginRight: `${margin}%`,
                      opacity: 1,
                      aspectRatio: fullAspectRatio,
                    },
                    inactive: {
                      marginLeft: "0%",
                      marginRight: "0%",
                      opacity: 0.5,
                      aspectRatio: collapsedAspectRatio,
                    },
                  }}
                >
                  <motion.img
                    src={photo.url}
                    className="h-full object-cover w-full"
                  />
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
