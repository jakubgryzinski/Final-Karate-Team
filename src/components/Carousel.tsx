import React, { useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import useKeypress from "react-use-keypress";

interface CarouselProps {
  images: any;
  runIndex: number;
}

let collapsedAspectRatio = 1 / 3;
let fullAspectRatio = 3 / 2;
let gap = 2;
let margin = 12;

export default function Carousel({ images, runIndex }: CarouselProps) {
  let [index, setIndex] = useState(runIndex);

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

  return (
    <MotionConfig transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}>
      <div className="max-h-7xl bg-black">
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center">
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ x: `-${index * 100}%` }}
              className="flex  aspect-[3/2]"
            >
              {images.map((image, i) => (
                <motion.img
                  key={image.src}
                  src={image.src}
                  animate={{ opacity: i === index ? 1 : 0.3 }}
                  className="aspect-[3/2] object-contain "
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
                  Left
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
                  Right
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute inset-x-0 bottom-6 flex justify-center overflow-hidden">
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
              {images.map((image, i) => (
                <motion.button
                  key={image}
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
                    src={image.src}
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
